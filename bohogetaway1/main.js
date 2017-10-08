
function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function getById(a){
  return document.getElementById(a);
}

function show(id){
  getById(id).style.display = 'visible';
}

function hide(id){
  getById(id).style.display = 'none';
}

function showDownload(key,id,data){
  console.log("download called");
  if(data && data.substring(0,9) == "Confirmed"){
    show(id);
  }
  else{
    hide(id);
  }
}

var startTime = new Date("2017-10-07 9:00 AM +530");
var endTime = new Date("2017-10-07 11:00 AM +530");
var currTime  = new Date();


function proniteConfirm(key,startTime, endTime,id){
  if(currTime >endTime){
    hide(id);
    // getById(closeId).innerHTML ="Confirmation Period is over";
  }
}

function proniteBook(key,startTime, endTime,id,closeId){
  if(currTime >endTime){
    hide(id);
    getById(closeId).innerHTML ="Booking is Closed";
  }
}

proniteBook("dhoom",startTime,endTime,"book-btn1","closed-booking1");
proniteBook("melange",startTime,endTime,"book-btn2","closed-booking2");
proniteBook("spectrum",startTime,endTime,"book-btn3","closed-booking3");
proniteBook("kaleidoscope",startTime,endTime,"book-btn4","closed-booking4");

var PROF = "IIT Delhi Staff";
var isProf = false;
var query_token = getQueryStringValue("token");
// console.log(query_token);
var token_data = {
  "token":query_token
}

function checkProf() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var userData = JSON.parse(this.responseText);
            // document.getElementById("demo").innerHTML = this.responseText;
            localStorage.setItem("userFullDetails", JSON.stringify(userData));
       }
    };
    xhttp.open("POST", "http://rdv-iitd.com/api/login/", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify(token_data));
}



if(query_token){
  checkProf();
  console.log("checkProf");
}

var userDetails = JSON.parse(localStorage.getItem("userFullDetails"));
// console.log(userDetails.user.college);


  function upDateInfo(token) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var userData = JSON.parse(this.responseText);
              // document.getElementById("demo").innerHTML = this.responseText;
              localStorage.setItem("userFullDetails", JSON.stringify(userData));
         }
      };
      xhttp.open("POST", "http://rdv-iitd.com/api/login/", true);
      xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
      xhttp.send(JSON.stringify(token));
  }


    if(userDetails){
      var token_data1 = {
        "token":userDetails.token
      }
      upDateInfo(token_data1);
    }




if(!query_token && !userDetails){
  window.location.href = "login.html";
  console.log("login please!");
}


if(userDetails && userDetails.user.college == PROF){
  isProf = true;
  getById("num-prof1").style.display = 'Visible';
  getById("num-prof2").style.display = 'Visible';
  getById("num-prof3").style.display = 'Visible';
  getById("num-prof4").style.display = 'Visible';
}
else{
  getById("num-prof1").style.display = 'None';
  getById("num-prof2").style.display = 'None';
  getById("num-prof3").style.display = 'None';
  getById("num-prof4").style.display = 'None';
}

// var showName = false;
// if(userDetails){
//   showName = true;
// }

if(userDetails){
  getById("welcome").style.display = 'Visible';
  getById("welcome").innerHTML = 'Welcome ' + userDetails.user.first_name + ' '+ userDetails.user.college;
}
else{
  getById("welcome").style.display = 'None';
}


function bookPass(dropdown,key){
  // var e = document.getElementById("prof-dropdown");
  var e = getById(dropdown);
  var strUser = e.options[e.selectedIndex].value;
  // console.log(strUser);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          getById("error-msg").innerHTML =this.responseText;
          // window.location.reload;
     }
     else{
       getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
     }
  };
  if(userDetails.user.college == PROF){
    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/book/?"+"pronite="+key+"&rdv_number="+userDetails.user.rdv_number+"&num_passes="+strUser, true);
  }
  else {
    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/book/?"+"pronite="+key+"&rdv_number="+userDetails.user.rdv_number, true);
  }

  xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send();

}

data = userDetails.user.dhoom;
console.log(data);
console.log(data && data.substring(0,6) == "Booked" && data.substring(0,9) !="Confirmed");
function disableBtn1(data,id1,id2,key){
  if(data && data.substring(0,6) == "Booked" && data.substring(0,9) !="Confirmed"){
    getById(id1).innerHTML = data;
    getById(id2).disabled = true;
  }
}

function disableBtn2(data,id1,id2,key){
  if(data && data.substring(0,9) == "Confirmed" && data.substring(0,6) !="Booked"){
    getById(id1).innerHTML = data;
    getById(id2).disabled = true;
  }
}

disableBtn1(userDetails.user.dhoom,"status-msg1","book-btn1","dhoom");
disableBtn1(userDetails.user.melange,"status-msg2","book-btn2","melange");
disableBtn1(userDetails.user.spectrum,"status-msg3","book-btn3","spectrum");
disableBtn1(userDetails.user.kaleidoscope,"status-msg4","book-btn4","kaleidoscope");


// console.log(userDetails.user.melange.substring(0,7));
function confirmPass(key,id){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          getById("error-msg").innerHTML =this.responseText;
          show(id);
          console.log("show id");
          // location.reload();
     }
     else{
       getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
     }
  };

    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/confirm/?"+"pronite="+key+"&rdv_number="+userDetails.user.rdv_number, true);


  xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send();

}


disableBtn2(userDetails.user.dhoom,"status-msg1","confirm-btn1","dhoom");
disableBtn2(userDetails.user.melange,"status-msg2","confirm-btn2","melange");
disableBtn2(userDetails.user.spectrum,"status-msg3","confirm-btn3","spectrum");
disableBtn2(userDetails.user.kaleidoscope,"status-msg4","confirm-btn4","kaleidoscope");

//start end time for confirmations for individual pronites
var startTime1 = new Date("2017-10-07 9:00 AM +530");
var endTime1 = new Date("2017-10-07 11:00 AM +530");

var startTime2 = new Date("2017-10-07 9:00 AM +530");
var endTime2 = new Date("2017-10-07 11:00 AM +530");

var startTime3 = new Date("2017-10-07 9:00 AM +530");
var endTime3 = new Date("2017-10-07 11:00 AM +530");

var startTime4 = new Date("2017-10-07 9:00 AM +530");
var endTime4 = new Date("2017-10-07 11:00 AM +530");

// proniteConfirm("dhoom",startTime1,endTime1,"confirm-btn1");
// proniteConfirm("melange",startTime1,endTime1,"confirm-btn2");
proniteConfirm("spectrum",startTime1,endTime1,"confirm-btn3");
proniteConfirm("kaleidoscope",startTime1,endTime1,"confirm-btn4");



function downloadPass(key){

  window.open(
  "http://rdv-iitd.com/api/pronite/pdf?"+"pronite="+key+"&token="+userDetails.token,
  '_blank' // <- This is what makes it open in a new window.
);

}



data1 = userDetails.user.dhoom;
console.log(data1 && data1.substring(0,9) == "Confirmed");
showDownload("dhoom","download-dhoom",userDetails.user.dhoom);
showDownload("melange","download-melange",userDetails.user.melange);
showDownload("spectrum","download-spectrum",userDetails.user.spectrum);
showDownload("kaleidoscope","download-kaleidoscope",userDetails.user.kaleidoscope);
