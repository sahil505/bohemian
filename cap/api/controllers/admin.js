/**
 * Created by Suyash on 02/07/17.
 */

var utils = require("../config/utils.js");
var config = require("../config/config.js");

var docClient = utils.connectToDB();

function approve_submission(req, res) {
  submission_id = req.body.submission_id;
  points = parseInt(req.body.points, 10);

  if(!submission_id || !points)
    return utils.error(res, 401, "Post submission id or points not given");

  date = (new Date).getTime();
  var params = {
    TableName: "2017_RDV_CAP",
    Key: {
      uuid: submission_id,
    },
    UpdateExpression: 'SET is_checked = :ok, points = points + :value, approved_by = :name, approved_date = :date', // String representation of the update to an attribute
    ConditionExpression: 'is_checked < :ok',
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': points * config.scaling_factor,
      ':ok': 1,
      ':name': req.user.name,
      ':date': (new Date).getTime(),
    },
    ReturnValues: 'ALL_NEW', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)
  };

  docClient.update(params, function (err, data) {
    if (data == undefined || err) {
      res.json(err);
      // res.json({"ok":0,"message": "Some error occurred while searching for submission"});
    } else {
      submission = data.Attributes;
      console.log(submission);
      var thatTime = new Date(submission.created);
      itemno = thatTime.getMonth() - 7;
      var params = {
        TableName: "2017_RDV_CAP",
        Key: {
          uuid: submission.user_id,
        },
        UpdateExpression: 'SET points = points + :value , month_points[' + itemno + '] = month_points[' + itemno + '] + :value2',// String representation of the update to an attribute
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
          ':value2': points,
          ':value': points * config.scaling_factor,
        },
        ReturnValues: 'NONE', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)
      };
      docClient.update(params, function (err, data) {
        if (data == undefined || err) {
          res.json({
            "ok": 0,
            "message": "Couldn't update user points" + err
          });
        } else {
          res.json({
            "ok": 1,
            "message": "Successfully updated user points"
          })
        }
      });
    }
  });

}

function get_submissions(req, res) {
  var params = {
    TableName: "2017_RDV_CAP",
    IndexName: 'submission', // optional (if querying an index)
    KeyConditionExpression: 'is_checked = :val', // a string representing a constraint on the attribute
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':val': 0
    },
    ScanIndexForward: true, // optional (true | false) defines direction of Query in the index
    Limit: 20, // optional (limit the number of items to evaluate)
  };
  docClient.query(params, function (err, data) {
    if (err || data == undefined) {
      res.json(err);
      // req.flash("failure", "Some error occurred. Please try after sometime.")
      // res.redirect("/profile");
    } else {
      submissions = data.Items;
      res.json(submissions);
      // res.render("approve.ejs",{submissions: submissions});
    }
  });
}


function add_filed(req, res) {

  var params = {
    TableName: "2017_RDV_CAP",
    ProjectionExpression: "email,#name,college,#type,created,month_points,points,#uuid,password,image_url",
    FilterExpression: "#type = :value",
    ExpressionAttributeNames: {
        '#name': "name",
        '#type': "type",
        '#uuid': "uuid",
    },
    ExpressionAttributeValues: {
        ":value":"user"
    }
  };
  //console.log("Scanning table for users monthly points");
  docClient.scan(params, onScan);

  function onScan(err, data) {
      if (err || data == undefined) {
          res.json(err);
          //console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          // print all the movies
          for(var i  in data.Items){
            var params = {
              TableName: "2017_RDV_CAP",
              Key:{
                "uuid": data.Items[i].uuid
              },
              //UpdateExpression: 'SET month_points[' + zero + '] = :value2, month_points[' + one + '] = :value, month_points[' + two + '] = :value',
              UpdateExpression: "set month_points= :value",
              ExpressionAttributeValues:{
                //":value2": data.Items[i].points,
                ":value": [data.Items[i].points / config.scaling_factor,0,0]
              },
              ReturnValues:"NONE"
            };
            docClient.update(params, function (err, data) {
              if (data == undefined || err) {
                //res.json(err);
                console.log(err);
              } else {
                //console.log("Updated for " + i + "th user");
              }
            });
          }
          if (typeof data.LastEvaluatedKey != "undefined") {
              console.log("Scanning for more...");
              params.ExclusiveStartKey = data.LastEvaluatedKey;
              docClient.scan(params, onScan);
          }
          else
          {
            res.json({
              "message":"updated all the users"
            })
          }
      }
  }

}


function get_cap_of_month(req, res) {

  var params = {
    TableName: "2017_RDV_CAP",
    ProjectionExpression: "email,#name,college,#type,month_points,points,#uuid,image_url",
    FilterExpression: "#type = :value",
    ExpressionAttributeNames: {
        '#name': "name",
        '#type': "type",
        '#uuid': "uuid",
    },
    ExpressionAttributeValues: {
        ":value":"user"
    }
  };
  //console.log("Scanning table for users monthly points");
  docClient.scan(params, onScan);

  var total_users = [];

  function onScan(err, data) {
      if (err || data == undefined) {
          res.json(err);
          //console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          // print all the movies

          //console.log("Scan succeeded."+data.Items);

          total_users = total_users.concat(data.Items);

          if (typeof data.LastEvaluatedKey != "undefined") {
              console.log("Scanning for more...");
              params.ExclusiveStartKey = data.LastEvaluatedKey;
              docClient.scan(params, onScan);
          }
          else
          {
            var cur_month = (new Date()).getMonth() - 7;
            total_users.sort(function(a, b) {
                return parseInt(b.month_points[cur_month],10) - parseInt(a.month_points[cur_month],10);
              });
            res.json(total_users);
          }
      }
  }

}





module.exports = {
  approve_submission: approve_submission,
  get_submissions: get_submissions,
  get_cap_of_month: get_cap_of_month,
  add_filed: add_filed
}
