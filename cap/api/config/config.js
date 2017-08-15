/**
 * Created by Suyash on 02/07/17.
 */

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.RDV_APP_ID, // your App ID
        'clientSecret'  : process.env.RDV_APP_SECRET, // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },
    "scaling_factor": 1000000000000000, // to avoid conflict in sort key values in leaderboard GSI
    "token_secret" : process.env.TOKEN_SECRET,
    "task_mail": "tasks@rdv.iitd.ac.in",
    "task_pass": "nothing_but_randomness",

    "cap_month_mail": "cap_month@rdv.iitd.ac.in",
    "cap_month_pass": "nothing_but_randomness_23904"
};
