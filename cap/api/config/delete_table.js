/**
 * Created by Suyash on 02/07/17.
 */

var utils = require("../config/utils.js");

var dynamodb = utils.connectTableDB();

var params = {
    TableName: "2017_RDV_CAP",
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});
