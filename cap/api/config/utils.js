/**
 * Created by Suyash on 02/07/17.
 */

const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const config = require('./config');

if (process.env.NODE_ENV === 'production') {
  console.log("Using production");
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "ap-south-1",
    endpoint: new AWS.Endpoint('https://dynamodb.ap-south-1.amazonaws.com')
  });
} else {
  AWS.config.update({
    accessKeyId: "myKeyId",
    secretAccessKey: "secretKey",
    region: "us-west-2",
    endpoint: "http://localhost:8000",
  });

}

function connectToDB() {
  return new AWS.DynamoDB.DocumentClient();
}

function connectTableDB() {
  return new AWS.DynamoDB();
}

function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the
  //app/collections/models
  var u = {
    uuid: user.uuid,
  };
  return token = jwt.sign(u, config.token_secret, {
    expiresIn: 60 * 60 * 24 * 60 // expires in 60 days
  });
}

function error(res, statusCode, msg) {
  res.status(statusCode).json({
    error: true,
    message: msg,
  })
}

module.exports = {
  connectToDB: connectToDB,
  generateToken: generateToken,
  connectTableDB: connectTableDB,
  error: error,
};