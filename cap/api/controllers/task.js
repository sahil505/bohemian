/**
 * Created by Suyash on 02/07/17.
 */

var config = require('../config/config.js');
var utils = require('../config/utils.js');
var docClient = utils.connectToDB();
var uuidV1 = require('uuid/v1');
var bcrypt = require('bcrypt-nodejs');

var TASK_UUID;
var params = {
    TableName: "2017_RDV_CAP",
    IndexName: 'mail_address', // optional (if querying an index)
    KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
        ':value': config.task_mail,
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
        if (!(data.Count > 0)) {
            console.log("tasks not yet created\nCreating task user");
            TASK_UUID = uuidV1();
            date = (new Date).getTime();
            var params = {
                TableName: "2017_RDV_CAP",
                Item: { // a map of attribute name to AttributeValue
                    uuid: TASK_UUID,
                    email: config.task_mail,
                    password: generateHash(config.task_pass),
                    type: "task",
                    city: "New Delhi",
                    college: "IIT Delhi",
                    phone: "9219932911",
                    created: date,
                    is_checked: 1,
                    submission: {},
                    points: date,
                    tasks: [],
                },
            };
            docClient.put(params, function (err, data) {
                if (err)
                    console.log("Internal Server Error: " + err);
                else
                    console.log("Task User successfully created");
            });
        } else {
            console.log("Populating TASK_UUID: " + data.Items[0].uuid);
            TASK_UUID = data.Items[0].uuid;
        }
    }
});

//GET TASKS
function get_tasks(req, res) {
    console.log("TASK: " + TASK_UUID);
    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: TASK_UUID,
        },
        ProjectionExpression: "tasks",
    };
    docClient.get(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error" + err);
        } else {
            if (!data.Item)
                return utils.error(res, 401, "Invalid task");
            var tasks = data.Item;
            tasks["tasks"].sort(function (a, b) {
                return (a.task_id > b.task_id) ? 1 : ((b.task_id > a.task_id) ? -1 : 0);
            })
            res.json(tasks);
        }
    });
}
//CREATE TASK
function create_task(req, res) {
    var name = req.body.name;
    var detail = req.body.detail;
    var image_url = req.body.image_url;
    var task_id = req.body.task_id;
    if (!name || !detail || !task_id)
        return utils.error(res, 401, "Name or detail of task not given or task_id is not a valid integer");

    var task = {
        "task_id": task_id,
        "image_url": image_url,
        "detail": detail,
        "name": name
    };
    task["created_by"] = req.user.uuid;
    task["last_modified"] = (new Date).getTime();

    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: TASK_UUID,
        },
        UpdateExpression: "set tasks = list_append(tasks,:r)",
        ExpressionAttributeValues: {
            ":r": [task],
        },
        ReturnValues: "NONE",
    };

    docClient.update(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error:" + err);
        } else {
            return res.json({
                error: false,
                message: "Task successfully added!"
            });
        }
    });

}
//MODIFY TASK
function modify_task(req, res) {
    var task_id = req.body.task_id;
    var name = req.body.name;
    var detail = req.body.detail;
    var image_url = req.body.image_url;
    if (!name || !detail || !task_id)
        return utils.error(res, 401, "Name or detail of task not given or task_id is not given");

    var new_task = {
        "task_id": task_id,
        "image_url": image_url,
        "detail": detail,
        "name": name
    };
    new_task["modified_by"] = req.user.uuid;
    new_task["last_modified"] = (new Date).getTime();

    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: TASK_UUID,
        },
        ProjectionExpression: "tasks",
    };
    docClient.get(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error" + err);
        } else {
            if (!data.Item)
                return utils.error(res, 401, "Invalid task");
            var tasks = data.Item.tasks;
            var new_tasks = [];
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].task_id != task_id) {
                    new_tasks.push(tasks[i]);
                } else {
                    new_task["created_by"] = tasks[i]["created_by"];
                    new_tasks.push(new_task);
                }
            }
            var params = {
                TableName: "2017_RDV_CAP",
                Key: {
                    uuid: TASK_UUID,
                },
                UpdateExpression: "set tasks = :r",
                ExpressionAttributeValues: {
                    ":r": new_tasks,
                },
                ReturnValues: "NONE",
            };

            docClient.update(params, function (err, data) {
                if (err) {
                    return utils.error(res, 500, "Internal Server Error:" + err);
                } else {
                    return res.json({
                        error: false,
                        message: "Task successfully updated!"
                    });
                }
            });
        }
    });
}
//DELETE tasks
function delete_task(req, res) {
    var task_id = req.body.task_id;
    if (!task_id)
        return utils.error(res, 401, "Task id not given");
    var params = {
        TableName: "2017_RDV_CAP",
        Key: {
            uuid: TASK_UUID,
        },
        ProjectionExpression: "tasks",
    };
    docClient.get(params, function (err, data) {
        if (err) {
            return utils.error(res, 500, "Internal Server Error" + err);
        } else {
            if (!data.Item)
                return utils.error(res, 401, "Invalid task");
            var tasks = data.Item.tasks;
            var new_tasks = [];
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].task_id != task_id)
                    new_tasks.push(tasks[i]);
            }
            var params = {
                TableName: "2017_RDV_CAP",
                Key: {
                    uuid: TASK_UUID,
                },
                UpdateExpression: "set tasks = :r",
                ExpressionAttributeValues: {
                    ":r": new_tasks,
                },
                ReturnValues: "NONE",
            };

            docClient.update(params, function (err, data) {
                if (err) {
                    return utils.error(res, 500, "Internal Server Error:" + err);
                } else {
                    return res.json({
                        error: false,
                        message: "Task successfully deleted!"
                    });
                }
            });
        }
    });
}

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = {
    get_tasks: get_tasks,
    create_task: create_task,
    modify_task: modify_task,
    delete_task: delete_task,
    get_uuid: function () {
        return TASK_UUID;
    },
}