/**
 * Created by Suyash on 02/07/17.
 */

var bcrypt = require('bcrypt-nodejs');
var uuidV1 = require('uuid/v1');
var utils = require('./config/utils.js');
var faker = require('faker');
faker.locale = "en_IND";

var taskGen = require("./controllers/task");

var docClient = utils.connectToDB();


const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


function create(name, email, password, type, city, phone, college, image_url) {
    if (image_url == undefined)
        image_url = faker.internet.avatar();
    if (city == undefined)
        city = faker.address.city();
    if (phone == undefined)
        phone = faker.phone.phoneNumber();
    if (college == undefined)
        college = faker.company.companyName();

    var date = (new Date).getTime();
    var params = {
        TableName: "2017_RDV_CAP",
        Item: { // a map of attribute name to AttributeValue
            uuid: uuidV1(),
            email: email,
            password: generateHash(password),
            type: type,
            name: name,
            city: city,
            college: college,
            phone: phone,
            created: date,
            image_url: image_url,
            is_checked: 1,
            submission: {},
            month_points:[0,0,0],
            points: date,
        },
    };
    console.log(params.Item);
    return docClient.put(params, function (err, data) {
        if (err)
            throw (err); // an error occurred
        return 1; // successful response
    });
}

function batch_create_fake_user(num, type) {
    for (var i = 0; i < num; i++) {
        create_fake_user(type, undefined, undefined);
    }
}

function create_fake_user(type, email, password) {
    if (email == undefined)
        var email = faker.internet.email();
    if (password == undefined)
        var password = "random_fake_password";
    var name = faker.name.findName();
    var image_url = faker.internet.avatar();
    var city = faker.address.city();
    var phone = faker.phone.phoneNumber();
    var college = faker.company.companyName();
    create(name, email, password, type, city, phone, college, image_url);
}
function batch_create_fake_submission(email, task_id, num) {
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
            console.log("Internal Server Error: " + err);
        } else {
            if (!(data.Count > 0))
                console.log("Email does not exist");
            var user = data.Items[0];
            create_fake_submission(user.uuid, task_id,num);
        }
    });
}
function create_fake_submission(uuid, task_id,num) {
    if(num <= 0) return;
    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: uuid,
        },
        ExpressionAttributeNames: {
            '#uuid': "uuid",
            '#name': "name",
        },
        ProjectionExpression: "#uuid,#name,submission",
        ConsistentRead: true,
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("Internal Server Error: " + err);
        } else {
            if (!data.Item)
                console.log("Email does not exist");
            var user_obj = data.Item;
            var url = faker.image.imageUrl();
            var submission_id = uuidV1();
            // Adding new submission to table
            date = (new Date).getTime();
            var params = {
                TableName: "2017_RDV_CAP",
                Item: { // a map of attribute name to AttributeValue
                    uuid: submission_id,
                    "user_id": user_obj.uuid,
                    "name": user_obj.name,
                    "type": "submission",
                    "task_id": task_id,
                    "url": url,
                    "created": date,
                    "is_checked": 0,
                    "points": date,
                    "detail": faker.lorem.paragraph(),
                },
            };
            console.log("submission", params.Item);
            docClient.put(params, function (err, data) {
                if (err)
                    throw (err); // an error occurred
                // successful response then add submission to the user array
                var params = {
                    TableName: "2017_RDV_CAP",
                    Key: {
                        uuid: user_obj.uuid,
                    },
                    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
                        "#id": task_id,
                    },
                    ExpressionAttributeValues: {
                        ":r": [submission_id],
                    },
                    ReturnValues: "NONE"
                };
                if (!(task_id in user_obj.submission)) {
                    // if new submission
                    params["UpdateExpression"] = "set submission.#id = :r";

                } else {
                    // adding submission
                    params["UpdateExpression"] = "set submission.#id = list_append(submission.#id, :r)";
                }

                docClient.update(params, function (err, data) {
                    if (err) {
                        console.log("Internal Server Error:" + err);
                    } else {
                        console.log("Submission successfully made!");
                        create_fake_submission(uuid, task_id,num-1);
                    }
                });
            });
        }
    });
}

function create_fake_task(task_id){
    var task = { "task_id": task_id.toString(), "image_url": faker.image.imageUrl(), "detail": faker.lorem.paragraph() , "name": faker.company.catchPhrase() };
    task["created_by"] = "random_data_generator";
    task["last_modified"] = (new Date).getTime();
    console.log(taskGen.TASK_UUID);

    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: taskGen.get_uuid(),
        },
        UpdateExpression: "set tasks = list_append(tasks,:r)",
        ExpressionAttributeValues: {
            ":r": [task],
        },
        ReturnValues: "NONE",
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.log( "Internal Server Error:" + err);
        } else {
            console.log("Task successfully added!");
        }
    });
}

function batch_create_fake_task(num) {
    for(var i=1;i<=num;i++)
    {
        create_fake_task(i);
    }
}

module.exports = {
    "create_fake_user": create_fake_user,
    "create_real_user": create,
    "create_fake_submission": create_fake_submission,
    "batch_create_fake_submission": batch_create_fake_submission,
    "batch_create_fake_user": batch_create_fake_user,
    "batch_create_fake_task": batch_create_fake_task,
};
