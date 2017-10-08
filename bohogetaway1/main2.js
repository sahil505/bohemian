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

var PROF = "IIT Delhi Staff";
var userFullDetails;

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

function checkProf(){
  if(userFullDetails && userFullDetails.user.college == PROF){
    return true;
  }
  else{
    return false;
  }
}

var startTimeProf = new Date("2017-10-07 9:00 AM +530");
var endTimeProf = new Date("2017-10-07 11:00 AM +530");

var startTimeIIT = new Date("2017-10-07 9:00 AM +530");
var endTimeIIT = new Date("2017-10-07 11:00 AM +530");

var startTimeExternal = new Date("2017-10-07 9:00 AM +530");
var endTimeExternal = new Date("2017-10-07 11:00 AM +530");

var currTime  = new Date();


function checkBookingPeriod(category){
  switch(category) {
    case 0:
        if(currTime=>startTimeProf && currTime<=endTimeProf){
          return true;
        }
        else{
          return false;
        }
        break;
    case 1:
        if(currTime=>startTimeIIT && currIIT<=endTimeIIT){
          return true;
        }
        else{
          return false;
        }
    break;
        break;
    case 2:
        if(currTime=>startTimeExternal && currTime<=endTimeExternal){
          return true;
        }
        else{
          return false;
        }
        break;
    default:
        return false;
      }
}

function checkConfirmPeriod(category){
  switch(category) {
    case 0:
        if(currTime=>startTimeProf && currTime<=endTimeProf){
          return true;
        }
        else{
          return false;
        }
        break;
    case 1:
        if(currTime=>startTimeIIT && currIIT<=endTimeIIT){
          return true;
        }
        else{
          return false;
        }
    break;
        break;
    case 2:
        if(currTime=>startTimeExternal && currTime<=endTimeExternal){
          return true;
        }
        else{
          return false;
        }
        break;
    default:
        return false;
      }
}


function checkBooked(key){

        if((userFullDetails.user.key).substring(0,6)== "Booked"){
          return true;
        }
        else{
          return false;
        }

}

function isIitStudent(){
  splitemail = userFullDetails.user.email.split("@")[1];
  if(splitemail == "iitd.ac.in"){
    return true;
  }
  else{
    return false;
  }
}


function main(){
  if(checkProf()){
    if(checkBookingPeriod(0)){
      keyArray = ["melange","spectrum","kaleidoscope","dhoom"];
      for(key_string : keyArray){}]
      if(checkBooked(key_string)){
        getById(key_string+"_book").style.display = "none";
        getById(key_string+"_confirm").style.display = "none";
        getById(key_string+"_download").style.display = "visible";
      }else{
        getById(key_string+"_book").style.display = "visible";
        getById(key_string+"_confirm").style.display = "none";
        getById(key_string+"_download").style.display = "none";
      }
    }else{
      getById(key_string+"_book").style.display = "none";
      getById(key_string+"_confirm").style.display = "none";
      getById(key_string+"_download").style.display = "none";
    }
  }
  else {
    if(isIitStudent()){
      if(checkBookingPeriod(1)){
        keyArray = ["melange","spectrum","kaleidoscope","dhoom"];
        for(key_string : keyArray){}]
        if(checkBooked(key_string)){
          getById(key_string+"_book").style.display = "none";
          getById(key_string+"_confirm").style.display = "none";
          getById(key_string+"_download").style.display = "none";
        }else{
          getById(key_string+"_book").style.display = "visible";
          getById(key_string+"_confirm").style.display = "none";
          getById(key_string+"_download").style.display = "none";
        }
      }
      else{

      }
        
    }
  }
}
