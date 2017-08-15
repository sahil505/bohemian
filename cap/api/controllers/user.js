/**
 * Created by Suyash on 02/07/17.
 */

var uuidV1 = require('uuid/v1');
var utils = require('../config/utils.js');
var bcrypt = require('bcrypt-nodejs');
var fbAuth = require("../config/fbAuth.js");

var docClient = utils.connectToDB();

var registered_users = new Set();
var clear_registered_users = setInterval(registered_users.clear, 1000*60*60*24 );

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password)
        return utils.error(res, 401, "Email or Password is wrong");
    var params = {
        TableName: "2017_RDV_CAP",
        IndexName: 'mail_address', // optional (if querying an index)
        KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
            ':value': email,
        },
        ExpressionAttributeNames: {
            '#name': "name",
            '#type': "type",
            '#uuid': "uuid",
        },
        ProjectionExpression: "email,#name,college,#type,month_points,points,#uuid,password,image_url",
    };
    docClient.query(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error: " + err);
        } else {
            if (!(data.Count > 0))
                return utils.error(res, 401, "Email does not exist");
            var user = data.Items[0];
            if (!validPassword(password, user.password))
                return utils.error(res, 401, "Password incorrect");
            const token = utils.generateToken(user);
            delete user['password'];
            return res.json({
                user: user,
                token: token,
            });
        }
    });
}

function fb_login(req, res) {
    var token = req.body.token;
    if (!token)
        return utils.error(res, 401, "Facebook Auth Token not found");

    fbAuth.token_validate(token, (err, fb_user) => {
        if (err) return utils.error(res, 401, "Facebook Auth Token was not valid");
        var params = {
            TableName: "2017_RDV_CAP",
            IndexName: 'mail_address', // optional (if querying an index)
            KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
            ExpressionAttributeValues: { // a map of substitutions for all attribute values
                ':value': fb_user.email || fb_user.fb_id,
            },
            ExpressionAttributeNames: {
                '#name': "name",
                '#uuid': "uuid",
                '#type': "type"
            },
            ProjectionExpression: "email,#name,college,#type,month_points,points,#uuid,password,image_url,fb_id",
        };
        docClient.query(params, function (err, data) {
            if (err) return utils.error(res, 401, "Internal Server Error" + err);
            if (data.Count > 0) {
                var old_user = data.Items[0];
                if (old_user.fb_id === undefined) {
                    // if logging in for first time
                    var params = {
                        TableName: "2017_RDV_CAP",
                        Key: {
                            uuid: old_user.uuid,
                        },
                        UpdateExpression: 'SET fb_id = :fb_id, image_url = :profilePicture, fb_token = :token, #name = :name',
                        ConditionExpression: 'attribute_not_exists(fb_id)',
                        ExpressionAttributeNames: {
                            "#name": "name",
                        },
                        ExpressionAttributeValues: { // a map of substitutions for all attribute values
                            ':fb_id': fb_user.fb_id,
                            ":name": fb_user.name,
                            // ":last_name": fb_user.lastName,
                            // ":first_name": fb_user.firstName,
                            ":profilePicture": fb_user.profilePicture,
                            ":token": fb_user.token,
                        },
                        ReturnValues: 'NONE', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)
                    };
                    docClient.update(params, function (err, data) {
                        if (err) return utils.error(res, 401, "Internal Server Error: " + err);
                        old_user["image_url"] = fb_user.profilePicture;
                        old_user["name"] = fb_user.name;
                        const token = utils.generateToken(old_user);
                        delete old_user['password'];
                        delete old_user['fb_id'];
                        return res.json({
                            user: old_user,
                            token: token,
                        });
                    });
                } else {
                    // return stored user
                    var user = old_user;
                    delete user['password'];
                    delete user['fb_id'];
                    const token = utils.generateToken(user);
                    return res.json({
                        user: user,
                        token: token,
                    });
                }
            } else {
                if (registered_users.has(fb_user.email)) {
                    return utils.error(res, 401, "Multiple User registration requests");
                } else {
                    registered_users.add(fb_user.email);
                }
                date = (new Date).getTime();
                var params = {
                    TableName: "2017_RDV_CAP",
                    Item: { // a map of attribute name to AttributeValue
                        uuid: uuidV1(),
                        email: fb_user.email || fb_user.fb_id,
                        password: generateHash("alskdjflk830298402394*)#(*$)23902398(#)*"),
                        type: "user",
                        created: date,
                        is_checked: 1,
                        image_url: fb_user.profilePicture,
                        fb_id: fb_user.fb_id,
                        fb_token: fb_user.token,
                        name: fb_user.name,
                        submission: {},
                        month_points: [0,0,0],
                        points: date,
                    },
                };
                docClient.put(params, function (err, data) {
                    if (err)
                        return utils.error(res, 500, "Internal Server Error" + err);

                    const token = utils.generateToken(params.Item);
                    var user = params.Item;
                    delete user["password"];
                    delete user["fb_id"];
                    delete user["fb_token"];
                    delete user["created"];

                    return res.json({
                        user: user,
                        token: token,
                    });
                });
                // return utils.error(res, 401, "Email not registered with RDV.");
            }
        });
    });
}

function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const college = req.body.college;
    const phone = req.body.phone;
    if (!email || !password || !city || !college || !phone)
        return utils.error(res, 401, "All fields are not provided");

    if (registered_users.has(email)) {
        return utils.error(res, 401, "User already exists");
    } else {
        registered_users.add(email);
    }

    var params = {
        TableName: "2017_RDV_CAP",
        IndexName: 'mail_address', // optional (if querying an index)
        KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
            ':value': email,
        },
        ExpressionAttributeNames: {
            '#uuid': "uuid",
        },
        ProjectionExpression: "#uuid",

    };
    docClient.query(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error" + err);
        } else {
            if (data.Count > 0) {
                return utils.error(res, 401, "User already exists");
            } else {
                date = (new Date).getTime();
                var params = {
                    TableName: "2017_RDV_CAP",
                    Item: { // a map of attribute name to AttributeValue
                        uuid: uuidV1(),
                        email: email,
                        password: generateHash(password),
                        type: "user",
                        city: city,
                        college: college,
                        phone: phone,
                        created: date,
                        is_checked: 1,
                        submission: {},
                        month_points: [0,0,0],
                        points: date,
                    },
                };
                docClient.put(params, function (err, data) {
                    if (err)
                        return utils.error(res, 500, "Internal Server Error" + err);

                    const token = utils.generateToken(params.Item);
                    var user = params.Item;
                    delete user["password"];
                    delete user["phone"];
                    delete user["created"];

                    return res.json({
                        user: user,
                        token: token,
                    });
                });
            }
        }
    });
}

function get_profile(uuid, cb) {
    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: uuid,
        },
        ExpressionAttributeNames: {
            '#name': "name",
            '#type': "type",
            '#uuid': "uuid",
        },
        ProjectionExpression: "email,#name,college,#type,month_points,points,#uuid,password,image_url,fb_id,submission,city,phone",
    };
    docClient.get(params, cb);
}

function profile(req, res) {
    function callback(err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error: " + err);
        } else {
            if (!data.Item)
                return utils.error(res, 401, "Invalid Token");
            delete data.Item['password'];
            return res.json({
                user: data.Item,
            });
        }
    }
    get_profile(req.user.uuid, callback);
}

function get_submission(req, res) {
    function callback(err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error: " + err);
        } else {
            if (!data.Item)
                return utils.error(res, 401, "Invalid Token");
            var submissions = data.Item.submission;

            submission_ids = []
            for (var task_id in submissions) {
                if (submissions.hasOwnProperty(task_id)) {
                    submissions[task_id].forEach(function (uuid) {
                        var key_dic = {
                            uuid: uuid
                        };
                        submission_ids.push(key_dic);
                    });
                }
            }

            // Recursive function that gets the result of all the submissions if number of
            // submissions exceed 100.
            function get_details(prev_result, all_submission_ids) {
                console.log("Calling recursion");
                // Return if no submissions made till now
                if (all_submission_ids.length == 0) {
                    // sorting the submissions
                    prev_result.sort(function (a, b) {
                        return (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0);
                    });
                    return res.json(prev_result);
                }


                // // getting all the submission ids to be processed in this request
                var current_submission_ids = all_submission_ids.slice(0, 100);

                // // creating the ids to be processed in next request
                var rest_submission_ids = all_submission_ids.slice(100);

                var params = {
                    RequestItems: { // map of TableName to list of Key to get from each table
                        "2017_RDV_CAP": {
                            Keys: current_submission_ids,
                            AttributesToGet: [
                                'task_id',
                                'is_checked',
                                'points',
                                'url',
                                'detail',
                                'uuid',
                                'created'
                            ],
                            ConsistentRead: false, // optional (true | false)
                        },
                    },
                    ReturnConsumedCapacity: 'NONE',
                };
                docClient.batchGet(params, function (err, data) {
                    if (err) {
                        return utils.error(res, 500, "Internal Server Error: " + err);
                    } else {
                        if (!data.Responses["2017_RDV_CAP"])
                            return utils.error(res, 401, "Invalid Response from Server");
                        if (data.UnprocessedKeys["2017_RDV_CAP"]) {
                            rest_submission_ids = rest_submission_ids.concat(data.UnprocessedKeys["2017_RDV_CAP"]);
                        }
                        prev_result = prev_result.concat(data.Responses["2017_RDV_CAP"]);
                        return get_details(prev_result, rest_submission_ids, callback);
                    }
                });
            }

            return get_details([], submission_ids);
        }
    }
    get_profile(req.user.uuid, callback);
    // return utils.error(res, 500, "Not yet implemented");
}

function create_submission(req, res) {
    console.log(req.body);
    task_id = req.body.task_id;
    url = req.body.image_url;
    detail = req.body.detail;
    if (!task_id || !url || !detail)
        return utils.error(res, 401, "Task id or image url or detail not found");

    // NOTE: PUT A CHECK IF task_id IS VALID!!

    submission_id = uuidV1();
    // Adding new submission to table
    date = (new Date).getTime();
    var params = {
        TableName: "2017_RDV_CAP",
        Item: { // a map of attribute name to AttributeValue
            uuid: submission_id,
            "user_id": req.user.uuid,
            "name": req.user.name,
            "type": "submission",
            "task_id": task_id,
            "url": url,
            "created": date,
            "is_checked": 0,
            "points": date,
            "detail": detail,
        },
    };
    docClient.put(params, function (err, data) {
        if (err)
            return utils.error(res, 500, "Internal Server Error:" + err);
        var params = {
            TableName: "2017_RDV_CAP",
            Key: {
                uuid: req.user.uuid,
            },
            ExpressionAttributeNames: {
                '#uuid': "uuid",
            },
            ProjectionExpression: "#uuid,submission",
            ConsistentRead: true,
        };
        docClient.get(params, function (err, data) {
            if (err) {
                return utils.error(res, 500, "Internal Server Error" + err);
            } else {
                if (!data.Item)
                    return utils.error(res, 401, "Invalid Token");
                // console.log("Apending: ",data.Item)
                var user = data.Item;
                // successful response then add submission to the user array
                var params = {
                    TableName: "2017_RDV_CAP",
                    Key: {
                        uuid: user.uuid,
                    },
                    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
                        "#id": task_id,
                    },
                    ExpressionAttributeValues: {
                        ":r": [submission_id],
                    },
                    ReturnValues: "NONE"
                };
                if (!(task_id in user.submission)) {
                    // if new submission
                    params["UpdateExpression"] = "set submission.#id = :r";

                } else {
                    // adding submission
                    params["UpdateExpression"] = "set submission.#id = list_append(submission.#id, :r)";
                }

                docClient.update(params, function (err, data) {
                    if (err) {
                        return utils.error(res, 500, "Internal Server Error:" + err);
                    } else {
                        return res.json({
                            error: false,
                            message: "Submission successfully made!"
                        });
                    }
                });
            }
        });
    });
}


function leaderboard(req, res) {
    var params = {
        TableName: "2017_RDV_CAP",
        IndexName: 'leaderboard', // optional (if querying an index)
        Limit: 20,
        KeyConditionExpression: '#type = :val', // a string representing a constraint on the attribute
        // FilterExpression: 'attr_name = :val', // a string representing a constraint on the attribute
        ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':val': "user"
        },
        ScanIndexForward: false, // optional (true | false) defines direction of Query in the index
        ExpressionAttributeNames: {
            '#name': "name",
            '#type': "type",
            '#uuid': "uuid"
        },
        ProjectionExpression: "#uuid,#name,college,points,image_url,city",
    };
    docClient.query(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error: " + err);
        } else {
            if (!data.Items)
                return utils.error(res, 500, "Internal Server Error: " + err);
            return res.json({
                leaderboard: data.Items,
            });
        }
    });
}

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validPassword = function (password, hashed) {
    return bcrypt.compareSync(password, hashed);
};

module.exports = {
    login: login,
    signup: signup,
    profile: profile,
    create_submission: create_submission,
    get_submission: get_submission,
    leaderboard: leaderboard,
    fb_login: fb_login,
}
