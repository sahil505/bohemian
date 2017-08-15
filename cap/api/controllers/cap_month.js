var config = require('../config/config.js');
var utils = require('../config/utils.js');
var docClient = utils.connectToDB();
var uuidV1 = require('uuid/v1');
var bcrypt = require('bcrypt-nodejs');


var CAP_MONTH_UUID;
var params = {
  TableName: "2017_RDV_CAP",
  IndexName: 'mail_address', // optional (if querying an index)
  KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
  ExpressionAttributeValues: { // a map of substitutions for all attribute values
    ':value': config.cap_month_mail,
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
      console.log("Cap month not yet created\nCreating cap month user");
      TASK_UUID = uuidV1();
      date = (new Date).getTime();
      var params = {
        TableName: "2017_RDV_CAP",
        Item: { // a map of attribute name to AttributeValue
          uuid: TASK_UUID,
          email: config.cap_month_mail,
          password: generateHash(config.cap_month_pass),
          type: "cap_month",
          city: "New Delhi",
          college: "IIT Delhi",
          phone: "9219932911",
          created: date,
          is_checked: 1,
          submission: {},
          points: date,
          tasks: [],
          cap_month_uuid: "random_uuid",
        },
      };
      docClient.put(params, function (err, data) {
        if (err)
          console.log("Internal Server Error: " + err);
        else
          console.log("CAP Month User successfully created");
      });
    } else {
      console.log("Populating CAP_MONTH_UUID: " + data.Items[0].uuid);
      CAP_MONTH_UUID = data.Items[0].uuid;
    }
  }
});

function get_cap_month(req, res) {
  console.log("CAP_MONTH_UUID: " + CAP_MONTH_UUID);
  var params = {
    TableName: "2017_RDV_CAP",
    Key: {
      uuid: CAP_MONTH_UUID,
    },
    ProjectionExpression: "cap_month_uuid",
  };
  docClient.get(params, function (err, data) {
    if (err) {
      return utils.error(res, 500, "Internal Server Error" + err);
    } else {
      if (!data.Item)
        return utils.error(res, 401, "Invalid cap uuid");
      var cap_month = data.Item;
      res.json(cap_month);
    }
  });
}

function set_cap_month(req, res) {
  var uuid = req.body.uuid;
  if (!uuid)
    return utils.error(res, 401, "UUID for cap month not given");

  var params = {
    TableName: "2017_RDV_CAP",
    Key: {
      uuid: CAP_MONTH_UUID,
    },
    UpdateExpression: "set cap_month_uuid = :r",
    ExpressionAttributeValues: {
      ":r": uuid,
    },
    ReturnValues: "NONE",
  };

  docClient.update(params, function (err, data) {
    if (err) {
      return utils.error(res, 500, "Internal Server Error:" + err);
    } else {
      return res.json({
        error: false,
        message: "CAP of the month successfully added!"
      });
    }
  });
}
const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = {
  get_cap_month: get_cap_month,
  set_cap_month: set_cap_month,
}