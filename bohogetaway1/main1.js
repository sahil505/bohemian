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



function proniteConfirm(key,startTime, endTime,id,closeId){
  if(currTime >endTime){
    hide(id);
    // getById(closeId).innerHTML ="Confirmation Period is over";
  }
}

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


var startTime = new Date("2017-10-07 9:00 AM +530");
var endTime = new Date("2017-10-07 11:00 AM +530");
var currTime  = new Date();

function proniteBook(key,startTime, endTime,id,closeId){
  if(currTime >endTime){
    hide(id);
    getById(closeId).innerHTML ="Booking is Closed";
  }
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

// console.log(getDetails());


function bookPass(dropdown ,key){

  // showhide("loader");
  var e = getById(dropdown);
  var strUser = e.options[e.selectedIndex].value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          getById("error-msg").innerHTML =this.responseText;
          // showhide("loader");
          // window.location.reload;
     }
     else{
       getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
     }
  };
  if(getDetails().user.college == PROF){
    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/book/?"+"pronite="+key+"&rdv_number="+userFullDetails.user.rdv_number+"&num_passes="+strUser, false);
  }
  else {
    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/book/?"+"pronite="+key+"&rdv_number="+userFullDetails.user.rdv_number, false);
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
          getById("error-msg").innerHTML =this.responseText;
          // location.reload();
     }
     else{
       getById("error-msg").innerHTML = JSON.parse(this.responseText).message;
     }
  };

    xhttp.open("GET", "http://rdv-iitd.com/api/pronite/confirm/?"+"pronite="+key+"&rdv_number="+userFullDetails.user.rdv_number, true);


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
       getById("error-msg").innerHTML ="Please Confirm first";
     }
  };
  xhttp.open("GET", "http://rdv-iitd.com/api/pronite/pdf?"+"pronite="+key+"&token="+userFullDetails.token, false);
  // xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhttp.send();



}


// confirmation timeline for each pronite
var startTime1 = new Date("2017-10-07 9:00 AM +530");
var endTime1 = new Date("2017-10-07 11:00 AM +530");

var startTime2 = new Date("2017-10-07 9:00 AM +530");
var endTime2 = new Date("2017-10-07 11:00 AM +530");

var startTime3 = new Date("2017-10-07 9:00 AM +530");
var endTime3 = new Date("2017-10-07 11:00 AM +530");

var startTime4 = new Date("2017-10-07 9:00 AM +530");
var endTime4 = new Date("2017-10-07 11:00 AM +530");




function isConfirm(data){
  if(data && data.substring(0,9) == "Confirmed" && data.substring(0,6) !="Booked"){
    return true;
  }
  else{
    return false;
  }
}

function disableDownload(data,id){
  if(data && data.substring(0,6) == "Booked" && data.substring(0,9) !="Confirmed"){
    getById(id).disabled = true;
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
function updateStatus(){
  proniteBook("dhoom",startTime,endTime,"book-btn1","closed-booking1");
  proniteBook("melange",startTime,endTime,"book-btn2","closed-booking2");
  proniteBook("spectrum",startTime,endTime,"book-btn3","closed-booking3");
  proniteBook("kaleidoscope",startTime,endTime,"book-btn4","closed-booking4");

  // proniteConfirm("dhoom",startTime1,endTime1,"confirm-btn1","closed-booking1");
  // proniteConfirm("melange",startTime1,endTime1,"confirm-btn2","closed-booking2");
  // proniteConfirm("spectrum",startTime1,endTime1,"confirm-btn3","closed-booking3");
  // proniteConfirm("kaleidoscope",startTime1,endTime1,"confirm-btn4","closed-booking4");

  disableBtn1(userFullDetails.user.dhoom,"status-msg1","book-btn1","dhoom");
  disableBtn1(userFullDetails.user.melange,"status-msg2","book-btn2","melange");
  disableBtn1(userFullDetails.user.spectrum,"status-msg3","book-btn3","spectrum");
  disableBtn1(userFullDetails.user.kaleidoscope,"status-msg4","book-btn4","kaleidoscope");

  disableBtn2(userFullDetails.user.dhoom,"status-msg1","confirm-btn1","dhoom");
  disableBtn2(userFullDetails.user.melange,"status-msg2","confirm-btn2","melange");
  disableBtn2(userFullDetails.user.spectrum,"status-msg3","confirm-btn3","spectrum");
  disableBtn2(userFullDetails.user.kaleidoscope,"status-msg4","confirm-btn4","kaleidoscope");

  // disableDownload(userFullDetails.user.dhoom,,"download-dhoom");
  // disableDownload(userFullDetails.user.melange,,'download-melange');
  // disableDownload(userFullDetails.user.spectrum,,"download-spectrum");
  // disableDownload(userFullDetails.user.kaleidoscope,,"download-kaleidoscope");

  updateType("num-prof1");
  updateType("num-prof2");
  updateType("num-prof3");
  updateType("num-prof4");
}

window.onload = updateStatus();
