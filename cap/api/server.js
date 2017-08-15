/**
 * Created by Suyash on 02/07/17.
 */
var express = require('express');
var port = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var userController = require("./controllers/user.js");
var adminController = require("./controllers/admin.js");
var sessionController = require("./controllers/session.js");
var taskController = require("./controllers/task.js");
var capMonthController = require("./controllers/cap_month.js");
// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

var router = express.Router();

router.use(cors(corsOption));
router.use(morgan('dev')); // log every request to the console
// get information from html forms
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  // res.sendfile("./index.html");
  res.send('Hi, You are in the cap api homepage'); // load the index.ejs file
});

//router.post('/login', userController.login);
router.post('/auth/facebook', userController.fb_login);
//router.post('/signup', userController.signup);

router.get('/profile', sessionController.isAuthenticated, userController.profile);
router.get('/leaderboard', sessionController.isAuthenticated, userController.leaderboard);

router.get('/submit', sessionController.isAuthenticated, userController.get_submission);
router.post('/submit', sessionController.isAuthenticated, userController.create_submission);

router.get('/approve', sessionController.isAuthenticated, sessionController.isAdmin, adminController.get_submissions);
router.post('/approve', sessionController.isAuthenticated, sessionController.isAdmin, adminController.approve_submission);

router.get('/tasks', sessionController.isAuthenticated, taskController.get_tasks);
router.post('/tasks', sessionController.isAuthenticated, sessionController.isGod, taskController.create_task);
router.put('/tasks', sessionController.isAuthenticated, sessionController.isGod, taskController.modify_task);
router.delete('/tasks', sessionController.isAuthenticated, sessionController.isGod, taskController.delete_task);

router.get('/cap_month', sessionController.isAuthenticated, sessionController.isAdmin, adminController.get_cap_of_month);
//router.post('/cap_month', sessionController.isAuthenticated, sessionController.isAdmin, adminController.add_filed);

if (require.main === module) {
  // if called directly
  var app = express();
  app.use("/api/cap", router);

  // launch ======================================================================
  app.listen(port);
  console.log('The magic happens on port ' + port);
}
else {
  //if imported as module : for rdv main website
  module.exports = router;
}
