/**
 * Created by Suyash on 02/07/17.
 */

var utils = require("../config/utils.js");

var dynamodb = utils.connectTableDB();

var params = {
    TableName: "2017_RDV_CAP",
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'uuid',
            KeyType: 'HASH',
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'uuid',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'type',
            AttributeType: 'S', // user, submission, event etc.
        },
        {
            AttributeName: 'fb_id',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'email',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'created',
            AttributeType: 'N', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'is_checked',
            AttributeType: 'N', // (for submissions only)
        },
        {
            AttributeName: 'points',
            AttributeType: 'N', // (useful for users only)
        },

    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
        {
            IndexName: 'mail_address',
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'email',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        {
            IndexName: 'facebook_id',
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'fb_id',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        {
            IndexName: 'submission',
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'is_checked',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'created',
                    KeyType: 'RANGE',
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        {
            IndexName: 'leaderboard',
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'type',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'points',
                    KeyType: 'RANGE',
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        // ... more global secondary indexes ...
    ],

};
dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});
