/**
 * Created by Suyash on 02/07/17.
 */

// route middleware to make sure a user is logged in
var config = require('../config/config.js');
var utils = require("../config/utils.js");
var jwt = require('jsonwebtoken');

var docClient = utils.connectToDB();

function isAuthenticated(req, res, next) {
    // console.log("Authenticating");
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (!token) {
        return utils.error(res, 401, "Token not found");
    }
    jwt.verify(token, config.token_secret, function (err, user) {
        if (err)
            return utils.error(res, 401, "Invalid Token");
        var params = {
            TableName: "2017_RDV_CAP",
            Key: {
                uuid: user.uuid,
            },
            ExpressionAttributeNames: {
                '#type': "type",
                '#uuid': "uuid",
                '#name': "name",
            },
            ProjectionExpression: "#uuid,email,password,fb_id,#type,is_checked,month_points,points,created,#name",
        };
        docClient.get(params, function (err, data) {
            if (err) {
                return utils.error(res, 500, "Internal Server Error"+err);
            } else {
                if (!data.Item)
                    return utils.error(res, 401, "Invalid Token");
                // console.log("Apending: ",data.Item)
                req.user = data.Item;
                next();
            }
        });
    });
}

function isAdmin(req, res, next) {
    if (req.user.type == "admin" || req.user.type == "god")
        return next();

    return utils.error(res, 403, "You do not have the required permissions");
}

function isGod(req, res, next) {
    if (req.user.type == "god")
        return next();
    return utils.error(res, 403, "You do not have the required permissions");
}

module.exports = {
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin,
    isGod: isGod,
}
