function getQueryStringValue(e){return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(e).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}function getById(e){return document.getElementById(e)}function show(e){getById(e).style.display="Visible"}function hide(e){getById(e).style.display="None"}function showDownload(e,t,s){console.log("download called"),s&&"Confirmed"==s.substring(0,9)?show(t):hide(t)}function proniteConfirm(e,t,s,o){currTime>s&&hide(o)}function proniteBook(e,t,s,o,n){currTime>s&&(hide(o),getById(n).innerHTML="Booking is Closed")}function checkProf(){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);localStorage.setItem("userFullDetails",JSON.stringify(e))}},e.open("POST","http://rdv-iitd.com/api/login/",!0),e.setRequestHeader("Content-type","application/json; charset=UTF-8"),e.send(JSON.stringify(token_data))}function upDateInfo(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);localStorage.setItem("userFullDetails",JSON.stringify(e))}},t.open("POST","http://rdv-iitd.com/api/login/",!0),t.setRequestHeader("Content-type","application/json; charset=UTF-8"),t.send(JSON.stringify(e))}function bookPass(e,t){var s=getById(e),o=s.options[s.selectedIndex].value,n=new XMLHttpRequest;n.onreadystatechange=function(){4==this.readyState&&200==this.status?(console.log(this.responseText),getById("error-msg").innerHTML=this.responseText):getById("error-msg").innerHTML=JSON.parse(this.responseText).message},userDetails.user.college==PROF?n.open("GET","http://rdv-iitd.com/api/pronite/book/?pronite="+t+"&rdv_number="+userDetails.user.rdv_number+"&num_passes="+o,!0):n.open("GET","http://rdv-iitd.com/api/pronite/book/?pronite="+t+"&rdv_number="+userDetails.user.rdv_number,!0),n.setRequestHeader("Content-type","application/json; charset=UTF-8"),n.send()}function disableBtn1(e,t,s,o){e&&"Booked"==e.substring(0,6)&&"Confirmed"!=e.substring(0,9)&&(getById(t).innerHTML=e,getById(s).disabled=!0)}function disableBtn2(e,t,s,o){e&&"Confirmed"==e.substring(0,9)&&"Booked"!=e.substring(0,6)&&(getById(t).innerHTML=e,getById(s).disabled=!0)}function confirmPass(e,t){var s=new XMLHttpRequest;s.onreadystatechange=function(){4==this.readyState&&200==this.status?(console.log(this.responseText),getById("error-msg").innerHTML=this.responseText,show(t),console.log("show id"),location.reload()):getById("error-msg").innerHTML=JSON.parse(this.responseText).message},s.open("GET","http://rdv-iitd.com/api/pronite/confirm/?pronite="+e+"&rdv_number="+userDetails.user.rdv_number,!0),s.setRequestHeader("Content-type","application/json; charset=UTF-8"),s.send()}function downloadPass(e){window.open("http://rdv-iitd.com/api/pronite/pdf?pronite="+e+"&token="+userDetails.token,"_blank")}var startTime=new Date("2017-10-07 9:00 AM +530"),endTime=new Date("2017-10-07 11:00 AM +530"),currTime=new Date;proniteBook("dhoom",startTime,endTime,"book-btn1","closed-booking1"),proniteBook("melange",startTime,endTime,"book-btn2","closed-booking2"),proniteBook("spectrum",startTime,endTime,"book-btn3","closed-booking3"),proniteBook("kaleidoscope",startTime,endTime,"book-btn4","closed-booking4");var PROF="IIT Delhi Staff",isProf=!1,query_token=getQueryStringValue("token"),token_data={token:query_token};query_token&&(checkProf(),console.log("checkProf"));var userDetails=JSON.parse(localStorage.getItem("userFullDetails"));if(userDetails){var token_data1={token:userDetails.token};upDateInfo(token_data1)}query_token||userDetails||(window.location.href="login.html",console.log("login please!")),userDetails&&userDetails.user.college==PROF?(isProf=!0,getById("num-prof1").style.display="Visible",getById("num-prof2").style.display="Visible",getById("num-prof3").style.display="Visible",getById("num-prof4").style.display="Visible"):(getById("num-prof1").style.display="None",getById("num-prof2").style.display="None",getById("num-prof3").style.display="None",getById("num-prof4").style.display="None"),userDetails?(getById("welcome").style.display="Visible",getById("welcome").innerHTML="Welcome "+userDetails.user.first_name+" "+userDetails.user.college):getById("welcome").style.display="None",data=userDetails.user.dhoom,console.log(data),console.log(data&&"Booked"==data.substring(0,6)&&"Confirmed"!=data.substring(0,9)),disableBtn1(userDetails.user.dhoom,"status-msg1","book-btn1","dhoom"),disableBtn1(userDetails.user.melange,"status-msg2","book-btn2","melange"),disableBtn1(userDetails.user.spectrum,"status-msg3","book-btn3","spectrum"),disableBtn1(userDetails.user.kaleidoscope,"status-msg4","book-btn4","kaleidoscope"),disableBtn2(userDetails.user.dhoom,"status-msg1","confirm-btn1","dhoom"),disableBtn2(userDetails.user.melange,"status-msg2","confirm-btn2","melange"),disableBtn2(userDetails.user.spectrum,"status-msg3","confirm-btn3","spectrum"),disableBtn2(userDetails.user.kaleidoscope,"status-msg4","confirm-btn4","kaleidoscope");var startTime1=new Date("2017-10-07 9:00 AM +530"),endTime1=new Date("2017-10-07 11:00 AM +530"),startTime2=new Date("2017-10-07 9:00 AM +530"),endTime2=new Date("2017-10-07 11:00 AM +530"),startTime3=new Date("2017-10-07 9:00 AM +530"),endTime3=new Date("2017-10-07 11:00 AM +530"),startTime4=new Date("2017-10-07 9:00 AM +530"),endTime4=new Date("2017-10-07 11:00 AM +530");proniteConfirm("dhoom",startTime1,endTime1,"confirm-btn1"),proniteConfirm("melange",startTime1,endTime1,"confirm-btn2"),proniteConfirm("spectrum",startTime1,endTime1,"confirm-btn3"),proniteConfirm("kaleidoscope",startTime1,endTime1,"confirm-btn4"),data1=userDetails.user.dhoom,console.log(data1&&"Confirmed"==data1.substring(0,9)),showDownload("dhoom","download-dhoom",userDetails.user.dhoom),showDownload("melange","download-melange",userDetails.user.melange),showDownload("spectrum","download-spectrum",userDetails.user.spectrum),showDownload("kaleidoscope","download-kaleidoscope",userDetails.user.kaleidoscope);
