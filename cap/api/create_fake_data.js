/**
 * Created by Suyash on 02/07/17.
 */

//NOTE: DO NOT RUN THIS AS A SCRIPT.
//      INSTEAD RUN IT LINE BY LINE IN NODE INTERPRETER
//      ELSE CONSISTENCY ERROR WILL OCCURR

var create_util = require("./create_util");

create_util.create_fake_user("user","suyash1212@gmail.com","password");
create_util.create_fake_user("user","korkudeepak@gmail.com","password");
create_util.create_fake_user("user","udit01@gmail.com","password");
create_util.create_fake_user("user","saketdingliwal@gmail.com","password");
create_util.create_fake_user("user","pandeyshrey33@gmail.com","password");
create_util.create_fake_user("admin","su@gmail.com","password");
create_util.create_fake_user("admin","kapilkorku@gmail.com","password");
create_util.create_fake_user("god","suyash101297@gmail.com","password");

console.log("Created Known Users");
create_util.batch_create_fake_user(20,"user");
console.log("Created Unknown Users");

console.log("Waiting for database to get its breath");
var waitTill = new Date(new Date().getTime() + 5 * 1000);
while(waitTill > new Date()){}
console.log("Creating submissions");

create_util.batch_create_fake_submission("suyash1212@gmail.com",1,3);
create_util.batch_create_fake_submission("korkudeepak@gmail.com",1,2);
console.log("Created submission postid 1");
create_util.batch_create_fake_submission("udit01@gmail.com",2,4);
create_util.batch_create_fake_submission("suyash1212@gmail.com",2,1);
console.log("Created submission postid 2");
create_util.batch_create_fake_submission("suyash101297@gmail.com",3,5);
create_util.batch_create_fake_submission("saketdingliwal@gmail.com",3,60);
create_util.batch_create_fake_submission("su@gmail.com",3,5);
// console.log("Created submission postid 3");

create_util.batch_create_fake_task(5);