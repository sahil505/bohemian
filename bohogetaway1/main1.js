function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function getById(a){
  return document.getElementById(a);
}

function show(id){
  getById(id).style.display = 'Visible';
}

function hide(id){
  getById(id).style.display = 'None';
}

function showhide(id)
   {
         var div = document.getElementById(id);
  if (div.style.display !== "none") {
      div.style.display = "none";
  }
  else {
      div.style.display = "block";
  }
}


var IIT_STD = "iitd.ac.in";

function checkStudent() {
    splitemail = userFullDetails.user.email.split("@")[1];
    return (IIT_STD===splitemail)

}

function checkStd(){
  splitemail = userFullDetails.user.email.split("@")[1];
  if(IIT_STD==splitemail){
    show("passes-grid");
  }
  else{
    hide("passes-grid");
    getById("error-msgstatus").innerHTML = "Booking Period is closed";
  }
}


var isBooking;
function proniteConfirm(key,startTime, endTime,id,closeId){
  if(currTime > endTime || currTime < startTime){
    hide(id);
    // getById(closeId).innerHTML ="Confirmation Period is over";
  }
}

function disableBtn1(data,id1,id2,key){
  if(data && data.substring(0,6) == "Booked" && data.substring(0,9) !="Confirmed"){
    getById(id1).innerHTML = data;
    disableBtn(id2);
  }
  else if(checkIfProf() && data && data.substring(0,9) == "Confirmed"){
      getById(id1).innerHTML = data;
      disableBtn(id2);
      hideBtn("prof-dropdown"+dropdown[dropdown.length-1])
  }
}

function disableBtn2(data,id1,id2,key){
  if(data && data.substring(0,9) == "Confirmed" && data.substring(0,6) !="Booked"){
    getById(id1).innerHTML = data;
      hideBtn(id2);
      console.log(id2);
  }
}


var startTime_s1 = new Date("2017-10-09 9:00 PM +530");
var endTime_s1 = new Date("2017-10-09 10:00 PM +530");
var startTime_s2 = new Date("2017-10-10 9:00 PM +530");
var endTime_s2 = new Date("2017-10-10 10:00 PM +530");
var startTime_s3 = new Date("2017-10-11 8:00 PM +530");
var endTime_s3 = new Date("2017-10-11 10:00 PM +530");

var startTime_n1 = new Date("2017-10-09 5:00 PM +530");
var endTime_n1 = new Date("2017-10-09 7:00 PM +530");
var startTime_n2 = new Date("2017-10-10 5:00 PM +530");
var endTime_n2 = new Date("2017-10-10 7:00 PM +530");
var startTime_n3 = new Date("2017-10-11 5:00 PM +530");
var endTime_n3 = new Date("2017-10-11 7:00 PM +530");

var startTime_f1 = new Date("2017-10-09 3:00 PM +530");
var endTime_f1 = new Date("2017-10-09 5:00 PM +530");
var startTime_f2 = new Date("2017-10-10 3:00 PM +530");
var endTime_f2 = new Date("2017-10-10 5:00 PM +530");
var startTime_f3 = new Date("2017-10-11 3:00 PM +530");
var endTime_f3 = new Date("2017-10-11 5:00 PM +530");

var currTime  = new Date();

function proniteBook(key,startTime, endTime,id,closeId){
  if(currTime >endTime){
    hide(id);
    getById(closeId).innerHTML ="Booking is Closed";
    isBooking = false;
  }
  else{
    isBooking = true;
  }
}


  function checkDownload(id,data){
    if(userFullDetails && userFullDetails.user.college == PROF || (data && data.substring(0,9) == "Confirmed")){
      show(id);
    }
    else{
      hide(id);
    }
  }

  function checkIfProf() {
      return userFullDetails && userFullDetails.user.college == PROF;
  }

var query_token = getQueryStringValue("token");
// console.log(query_token);
var query_token_data = {
  "token":query_token
}

var token = JSON.parse(localStorage.getItem("token"));
var token_data = {
  "token":token
}
console.log(token);
var userFullDetails;
var isLoading = false;
var PROF = "IIT Delhi Staff";



function checkProf() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            userFullDetails = JSON.parse(this.responseText);
            localStorage.setItem("token", JSON.stringify(userFullDetails.token));
       }
    };
    xhttp.open("POST", "http://rdv-iitd.com/api/login/", false);
    xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify(query_token_data));
}



function getDetails(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          userFullDetails = JSON.parse(this.responseText);
          localStorage.setItem("token", JSON.stringify(userFullDetails.token));
     }
  };
  xhttp.open("POST", "http://rdv-iitd.com/api/login/", false);
  xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send(JSON.stringify(token_data));

return userFullDetails;

}

if(query_token){
  window.onload = checkProf();
  console.log("checkProf");
}
else{
  window.onload = getDetails();
}
// window.onload = getDetails();

console.log(userFullDetails);


if(!query_token && !userFullDetails){
  window.location.href = "login.html";
  console.log("login please!");
}

function bookPass(dropdown ,key){

  disableBtn("book-btn"+dropdown[dropdown.length-1]);

  // showhide("loader");
  var e = getById(dropdown);
  var strUser = e.options[e.selectedIndex].value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
          // showhide("loader");
          // window.location.reload;
     }
     else{
       getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
       enableBtn("book-btn"+dropdown[dropdown.length-1]);
     }
  };
  if(checkIfProf()){
    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/book/?"+"token="+token+"&pronite="+key+"&rdv_number="+userFullDetails.user.rdv_number+"&num_passes="+strUser, false);
  }
  else {
    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/book/?"+"token="+token+"&pronite="+key+"&rdv_number="+userFullDetails.user.rdv_number, false);
  }

  xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send();
}

// bookPass("prof-dropdown1","dhoom");
// console.log("book called");

function confirmPass(key,id){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
          // location.reload();
     }
     else{
       getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
     }
  };

    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/confirm/?"+"pronite="+key+"&rdv_number="+userFullDetails.user.rdv_number+"&token="+token, true);


  xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send();

}


function downloadPass(key){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        window.open(
        "http://rdv-iitd.com/api/pronite/pdf?"+"pronite="+key+"&token="+userFullDetails.token,
        '_blank' // <- This is what makes it open in a new window.
      );
     }
     else{
          getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
     }
  };
  xhttp.open("GET", "http://rdv-iitd.com/api/pronite/pdf?"+"pronite="+key+"&token="+userFullDetails.token, false);
  // xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send();



}


// confirmation timeline for each pronite
var startTime1 = new Date("2017-10-16 11:00 AM +530");
var endTime1 = new Date("2017-10-16 1:00 PM +530");

var startTime2 = new Date("2017-10-13 11:00 AM +530");
var endTime2 = new Date("2017-10-13 1:00 PM +530");

var startTime3 = new Date("2017-10-14 11:00 AM +530");
var endTime3 = new Date("2017-10-14 1:00 PM +530");

var startTime4 = new Date("2017-10-15 11:00 AM +530");
var endTime4 = new Date("2017-10-15 1:00 PM +530");



function isConfirm(data){
  if(data && data.substring(0,9) == "Confirmed" && data.substring(0,6) !="Booked"){
    return true;
  }
  else{
    return false;
  }
}

function downloadBtn(data,id){
  if(userFullDetails && userFullDetails.user.college == PROF){
    getById(id).style.display = 'Visible';

    if(data && data.substring(0,6) == "Booked" && data.substring(0,9) !="Confirmed"){
      getById(id).disabled = true;
    }
  }
  else{
    if(data && data.substring(0,6) == "Booked" && data.substring(0,9) !="Confirmed"){
      getById(id).disabled = true;
    }
  }

}


function updateType(id){
  if(userFullDetails && userFullDetails.user.college == PROF){
    isProf = true;
    getById(id).style.display = 'Visible';
  }
  else{
    getById(id).style.display = 'None';
  }
}

function logout() {
    if(checkIfProf()){
        window.location = "http://brca.iitd.ac.in/rdv-reg";
    }
    else
        window.location = "login.html";
}

function checksTimeStudent() {
    return (currTime>=startTime_s1 && currTime<=endTime_s1) ||
        (currTime>=startTime_s2 && currTime<=endTime_s2) ||
        (currTime>=startTime_s3 && currTime<=endTime_s3);
}

function checksTimeProf() {
    return (currTime>=startTime_f1 && currTime<=endTime_f1) ||
        (currTime>=startTime_f2 && currTime<=endTime_f2) ||
        (currTime>=startTime_f3 && currTime<=endTime_f3);
}

function checksTimeExt() {
    return (currTime>=startTime_n1 && currTime<=endTime_n1) ||
        (currTime>=startTime_n2 && currTime<=endTime_n2) ||
        (currTime>=startTime_n3 && currTime<=endTime_n3);
}

function hideBtn(name) {
    console.log(name);
    getById(name).style.display = "none";
}

function disableBtn(name) {
    console.log(name);
    getById(name).disabled = true;
}

function enableBtn(name) {
    console.log(name);
    getById(name).disabled = false;
}

function hideC() {
    for(var i=1;i<5;i++)
        hideBtn("confirm-btn"+i);
}
function hideB() {
    for(var i=1;i<5;i++)
        hideBtn("book-btn"+i);
}
function hideP() {
    for (var i = 1; i < 5; i++)
        hideBtn("prof-dropdown" + i);
}
function checksTime(s,e) {
    return currTime >= s && currTime <= e;
}
function updateStatus() {
    console.log(userFullDetails);
    if (checkStudent()) {
        console.log('checks student');
        if (checksTimeStudent()) {

        }
        else {
            getById("error-msg").innerHTML ="Not open for booking now";
            hideB();
        }
    }
    else if (checkIfProf()) {
        if (checksTimeProf()) {

        }
        else {
            hideB();hideC();hideP();
        }
    }
    else{ // external hi hoga ab
        if(checksTimeExt()){
            if(!checksTime(startTime_n3,endTime_n3))
                hideBtn("book-btn1");
            if(!checksTime(startTime_n1,endTime_n1))
                hideBtn("book-btn2");
            if(!checksTime(startTime_n2,endTime_n2))
                hideBtn("book-btn3");
            if(!checksTime(startTime_n1,endTime_n1))
                hideBtn("book-btn4");
        }
        else{
            getById("error-msg").innerHTML ="Not open for booking now";
            hideB();
        }
    }
    // proniteBook("dhoom",startTime,endTime,"book-btn1","closed-booking1");
    // proniteBook("melange",startTime,endTime,"book-btn2","closed-booking2");
    // proniteBook("spectrum",startTime,endTime,"book-btn3","closed-booking3");
    // proniteBook("kaleidoscope",startTime,endTime,"book-btn4","closed-booking4");

    proniteConfirm("dhoom", startTime1, endTime1, "confirm-btn1", "closed-booking1");
    proniteConfirm("melange", startTime2, endTime2, "confirm-btn2", "closed-booking2");
    proniteConfirm("spectrum", startTime3, endTime3, "confirm-btn3", "closed-booking3");
    proniteConfirm("kaleidoscope", startTime4, endTime4, "confirm-btn4", "closed-booking4");

    disableBtn1(userFullDetails.user.dhoom, "status-msg1", "book-btn1", "dhoom");
    disableBtn1(userFullDetails.user.melange, "status-msg2", "book-btn2", "melange");
    disableBtn1(userFullDetails.user.spectrum, "status-msg3", "book-btn3", "spectrum");
    disableBtn1(userFullDetails.user.kaleidoscope, "status-msg4", "book-btn4", "kaleidoscope");

    disableBtn2(userFullDetails.user.dhoom, "status-msg1", "confirm-btn1", "dhoom");
    disableBtn2(userFullDetails.user.melange, "status-msg2", "confirm-btn2", "melange");
    disableBtn2(userFullDetails.user.spectrum, "status-msg3", "confirm-btn3", "spectrum");
    disableBtn2(userFullDetails.user.kaleidoscope, "status-msg4", "confirm-btn4", "kaleidoscope");

    // disableDownload(userFullDetails.user.dhoom,,"download-dhoom");
    // disableDownload(userFullDetails.user.melange,,'download-melange');
    // disableDownload(userFullDetails.user.spectrum,,"download-spectrum");
    // disableDownload(userFullDetails.user.kaleidoscope,,"download-kaleidoscope");
    checkDownload("download-dhoom",userFullDetails.user.dhoom);
    checkDownload("download-melange",userFullDetails.user.melange);
    checkDownload("download-spectrum",userFullDetails.user.spectrum);
    checkDownload("download-kaleidoscope",userFullDetails.user.kaleidoscope);

    updateType("num-prof1");
    updateType("num-prof2");
    updateType("num-prof3");
    updateType("num-prof4");
}

window.onload = updateStatus();
