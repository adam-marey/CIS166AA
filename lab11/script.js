/*  JavaScript 6th Edition
    Chapter 11
    Hands-on Project 11-4

    Author: Sulaiman Marey
    Date:   11/20/2022

    Filename: script.js
*/

"use strict";

// global variables
var httpRequest = false;
function checkButtons() {
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
    if (germany.checked || us.checked) {
    document.getElementById("zipset").style.visibility =
    "visible";
    if (germany.checked) {
    countrySel = "de";
    } else {
       countrySel = "us";
       }
   }
}




function checkInput() {
   var zip = document.getElementById("zip").value; 
   if (zip.length === 5) {
      getLocation();
   } else {
      document.getElementById("city").value = "";
      document.getElementById("state").value = "";
   }
}

function getLocation() {
   var zip = document.getElementById("zip").value; //user INPUT
   lbl.innerHTML = "";
   if (!httpRequest) {
      httpRequest = getRequestObject();
   }
   httpRequest.abort();
   httpRequest.open("get","http://api.zippopotam.us/" + countrySel + '/' + zip, true);
   //2. Send the request and call displayData when the ready state of the request changes.
	httpRequest.send();
	httpRequest.onreadystatechange = displayData;
}

function getRequestObject() {
   try {
      //1. Create a new XMLHttpRequest object
	  httpRequest = new XMLHttpRequest();
   }
   catch (requestError) {
       // display city & state fields and labels for manual input
       document.getElementById("zipset").style.visibility =
       "visible";
       document.getElementById("csset").style.visibility =
       "visible";
       // remove event listeners so additional input is ignored
       var germany = document.getElementById("germany");
       var us = document.getElementById("us");
 var zip = document.getElementById("zip").value;
 if (zip.addEventListener) {
 germany.removeEventListener("click", checkButtons,
 false);
 us.removeEventListener("click", checkButtons, false);
 zip.removeEventListener("keyup", checkInput, false);
 } else if (zip.attachEvent) {
 germany.detachEvent("onclick", checkButtons);
 us.detachEvent("onclick", checkButtons);
 zip.detachEvent("onkeyup", checkInput);
 }
 return false;
 }
   //3. Return the XMLHttpRequest object
   return httpRequest;
}

function displayData() {
    var germany = document.getElementById("germany");
 var us = document.getElementById("us");
 if (us.addEventListener) {
 germany.addEventListener("click", checkButtons, false);
 us.addEventListener("click", checkButtons, false);
 } else if (us.attachEvent) {
 germany.attachEvent("onclick", checkButtons);
 us.attachEvent("onclick", checkButtons);
 }

   //4. Add an if statement to check the ready state and status to see if data is ready to process
   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
		lbl.innerHTML = "";
	
	//alert(httpRequest.responseText);
		
/*
{"post code": "85005", "country": "United States", 
"country abbreviation": "US", "places": 
[{"place name": "Phoenix", "longitude": "-112.1872", 
"state": "Arizona", "state abbreviation": "AZ", 
"latitude": "33.2765"}]}
*/		
		
	  var resultData = JSON.parse(httpRequest.responseText);

	//alert(resultData.places[0]["state abbreviation"]);

      var city = document.getElementById("city");
      var state = document.getElementById("state");
      city.value = resultData.places[0]["place name"];
      state.value = resultData.places[0]["state abbreviation"];
      document.getElementById("zip").blur();
      document.getElementById("csset").style.visibility = "visible";
   }
   else {
      lbl.innerHTML = "NOT FOUND";
   }
}

var lbl = document.getElementById("cout");
var zip = document.getElementById("zip"); 
if (zip.addEventListener) {
   zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
   zip.attachEvent("onkeyup", checkInput);
}

