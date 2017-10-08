
function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// Would write the value of the QueryString-variable called name to the console
console.log(getQueryStringValue("name")); 
// var getData = function myFunction() {
//
// }
