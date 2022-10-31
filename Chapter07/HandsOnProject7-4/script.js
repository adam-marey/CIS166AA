var delivInfo = {};
var delivSummary = document.getElementById('deliverTo');

var foodInfo = {};
var foodSummary = document.getElementById('order');
function processDeliveryInfo() {
  var prop;
  delivInfo.name = document.getElementById('nameinput').value;
  delivInfo.addr = document.getElementById('addrinput').value;
  delivInfo.city = document.getElementById('cityinput').value;
  delivInfo.email = document.getElementById('emailinput').value;
  delivInfo.phone = document.getElementById('phoneinput').value;
  for (prop in delivInfo) {
    document.getElementById('deliverTo').innerHTML +=
      '<p>' + delivInfo[prop] + '</p>';
  }
}
function previewOrder() {
  processFood();
  processDeliveryInfo();
}
function processFood() {
  var prop;

  var crustOpt = document.getElementsByName('crust');

  var toppings = 0;
  var toppingsBoxes = document.getElementsByName('toppings');

  var instr = document.getElementById('instructions');

  if (crustOpt[0].checked) {
    foodInfo.crust = crustOpt[0].value;
  } else {
    foodInfo.crust = crustOpt[1].value;
  }
  foodInfo.size = document.getElementById('size').value;
  for (var i = 0; i < toppingsBoxes.length; i++) {
    if (toppingsBoxes[i].checked) {
      toppings++;

      foodInfo['topping' + toppings] = toppingsBoxes[i].value;
    }
  }
  if (instr.value != null) {
    foodInfo.instructions = instr.value;
  }
  foodSummary.innerHTML += '<p><span>Crust</span>:' + foodInfo.crust + '</p>';
  foodSummary.innerHTML += '<p><span>Size</span>:' + foodInfo.size + '</p>';
  foodSummary.innerHTML += '<p><span>Toppings</span>:</p>';
  foodSummary.innerHTML += '<ul>';
  for (var i = 1; i < 6; i++) {
    if (foodInfo['topping' + i]) {
      foodSummary.innerHTML += '<li>' + foodInfo['topping' + i] + '</li>';
    }
  }
  foodSummary.innerHTML += '</ul>';
  foodSummary.innerHTML +=
    '<p><span>Instructions</span>:' + foodInfo.instructions;
  document.getElementById('order').style.display = 'block';
}
function addListener() {
  var submitButton = document.getElementById('previewBtn');
  if (submitButton.addEventListener) {
    submitButton.addEventListener('click', previewOrder, false);
  } else if (submitButton.attachEvent) {
    submitButton.attachEvent('onclick', previewOrder);
  }
}

if (window.addEventListener) {
  window.addEventListener('load', addListener, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', addListener);
}
