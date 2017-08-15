/**
 * Created by Suyash on 17/07/17.
 */

var utils = require("../config/utils.js");

var docClient = utils.connectToDB();

function delete_uuid(uuid) {
  var params = {
    TableName: '2017_RDV_CAP',
    Key: {
      uuid: uuid,
    }
  };
  docClient.delete(params, function (err, data) {
    if (err) console.log(err); // an error occurred
    else console.log("deleted: ",uuid); // successful response
  });
}

function delete_items(index, uuids) {
  if (index >= uuids.length) {
    return;
  }

  console.log("Deleting ", uuids[index].email);
  delete_uuid(uuids[index].uuid);

  setTimeout(function () {
    delete_items(index + 1, uuids);
  }, 200);
}

var params = {
  TableName: '2017_RDV_CAP',
  FilterExpression: '#type = :value',
  ExpressionAttributeNames: {
    '#type': 'type'
  },
  ExpressionAttributeValues: {
    ':value': 'submission'
  },
  Select: 'ALL_ATTRIBUTES',
};
docClient.scan(params, function (err, data) {
  if (err) console.log(err); // an error occurred
  else {
    console.log("Deleting now");
    delete_items(0, data.Items);
  }
});