/**
 * Created by Suyash on 02/07/17.
 */

var config = require('../config/config.js');
var request = require('request');

function token_validate(token, cb) {
  const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  const graphApiUrl = `https://graph.facebook.com/v2.5/me?fields=${fields.join(',')}`;
  const params = {
    access_token: token,
  };

  // Step 1. Retrieve profile information about the current user.
  request.get({
    url: graphApiUrl,
    qs: params,
    json: true
  }, (err, response, profile) => {
    if(err) return(err);
    if (response.statusCode !== 200) {
      // console.log("not valid");
      return cb(response);
    }
    const user = {
      profilePicture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
      firstName: profile.first_name,
      lastName: profile.last_name,
      name: profile.name,
      fb_id: profile.id,
      email: profile.email,
      token: token
    };

    cb(null, user);
  });
}

module.exports = {
  token_validate: token_validate,
}
