'use strict';

//global variable list

var list = [];

//function to generate list

function generateList() {
  //get all list items

  var listItems = document.getElementsByTagName('li');

  //using for loop

  for (var i = listItems.length - 1; i >= 0; i--) {
    document.getElementsByTagName('ol')[0].removeChild(listItems[i]);
  }

  //using for loop

  for (var i = 0; i < list.length; i++) {
    var newItem = "<span class='first'>first</span>" + list[i];

    var newListItem = document.createElement('li');

    newListItem.innerHTML = newItem; //set text

    document.getElementsByTagName('ol')[0].appendChild(newListItem);

    var firstButtons = document.querySelectorAll('.first');

    var lastFirstButton = firstButtons[firstButtons.length - 1];

    if (lastFirstButton.addEventListener) {
      lastFirstButton.addEventListener('click', moveToTop, false);
    } else if (lastFirstButton.attachEvent) {
      lastFirstButton.attachEvent('onclick', moveToTop);
    }
  }
}

//function to add item

function addItem() {
  //get the textbox element with id as newItem

  var newItem = document.getElementById('newItem');

  list.push(newItem.value); //add element into the array

  newItem.focus(); //set focus to textbox

  newItem.value = ''; //clear the text

  //call function generateList()

  generateList();
}

//function to move the items to the top

function moveToTop(evt) {
  if (evt === undefined) {
    evt = window.event;
  }

  var callerElement = evt.target || evt.srcElement;

  //get all li elements

  var listItems = document.getElementsByTagName('li');

  //this get the parent element of first button

  var parentItem = callerElement.parentNode;

  //using for loop with search menthod

  for (var i = 0; i < list.length; i++) {
    if (parentItem.innerHTML.search(list[i]) !== -1) {
      //uses slice() method tp slice the element from the array

      var itemToMove = list.splice(i, 1);

      list.unshift(itemToMove); //this will add the new element at the start of the array
    }
  }

  generateList(); //call generateList() function to recreate order list
}

//this function will add eventListener for button

function createEventListener() {
  //get the button

  var addButton = document.getElementById('button');

  if (addButton.addEventListener) {
    addButton.addEventListener('click', addItem, false);
  } else if (addButton.attachEvent) {
    addButton.attachEvent('onclick', addItem);
  }
}

if (window.addEventListener) {
  window.addEventListener('load', createEventListener, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', createEventListener);
}
