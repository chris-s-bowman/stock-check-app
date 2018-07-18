// functions for querySelector and createElement

function $(el) {
  return document.querySelector(el);
}
function create(el) {
  return document.createElement(el);
}

// array of bumper names
var selectArr = [];
var bumpers = ["083 Front", "083 Low Grade Rear", "083 High Grade Rear", "B12P Front", "B12P Rear", "724 Front Upper", "724 Front Lower", "724 Rear Upper", "724 Rear Lower", "Nismo Rear", "GD1A GT Front", "GD1A Sport Front", "GD1A All Road Front", "GD1A GT/Sport Rear Upper", "GD1A All Road Rear", "GD1A Lower #1", "GD1A Twin Lower", "GD1A Sport Lower" ];

// sort function to order bumper names in alphabetical order
// bumpers.sort(function(a, b) {
//   if(a < b) return -1;
//   if(a > b) return 1;
//   return 0;
// });

// creating object of all bumpers including name and number of parts
var bumperObj = [];
for(var i = 0; i < bumpers.length; i++) {
  bumperObj[i] = {name: bumpers[i], numOfParts: "0"};
}

// creating form as a parent element for all of the data
var form = document.createElement("form");
form.setAttribute("method", "post");

var totalsDiv = $(".totals");

// all html is added with this for loop
for(var i = 0; i < bumpers.length; i++) {
  var label = create("label");
  label.setAttribute("for", bumpers[i]);
  label.innerHTML = bumpers[i];

  var select = create("select");
  form.append(label);
  label.appendChild(select);
  select.classList.add("select");
  selectArr.push(select);

  var buttonDiv = create("div");
  buttonDiv.classList.add("buttonDiv");
  label.appendChild(buttonDiv);

  var del = create("button");
  del.innerHTML = "<img class=\"cross\" src=\"cross.svg\">";
  del.setAttribute("type", "button");
  del.classList.add("del");
  buttonDiv.appendChild(del);

  var calc = create("button");
  calc.innerHTML = "Calculate";
  calc.setAttribute("type", "button");
  calc.classList.add("calc");
  buttonDiv.appendChild(calc);


  var val = create("div");
  val.innerHTML = 0;
  val.classList.add("values");
  label.appendChild(val);

  var result = create("div");
  result.innerHTML = bumpers[i] + ": ";
  result.classList.add("result");
  totalsDiv.appendChild(result);

  for(var j = 1; j < 100; j++){
    var option = document.createElement("option");

    option.text = j;
    select.appendChild(option);
  }
}


var button = document.getElementsByClassName("calc");
var delButton = document.getElementsByClassName("del");
var inputs = document.getElementsByClassName("select");
var vals = document.getElementsByClassName("values");
var result = document.getElementsByClassName("result");


$(".container").appendChild(form);

function calcButtons(buttonNum, inputNum, valueNum, delNum, resultNum, bumpersNum) {
  var  count = 0;
  var partType = inputNum.parentElement.htmlFor;
  var snp = 0;

  if(partType.includes("B12P")) {
    snp = 8;
  }
  else if (partType.includes("GD1A") && partType.includes("Lower")){
    snp = 15;
  }
  else if (partType.includes("GD1A")){
    snp = 9;
  }
  else {
    snp = 12;
  }
  console.log(bumpersNum.numOfParts);
  var displayNumOfParts = create("div");
  displayNumOfParts.classList.add("partsDisplay");
  displayNumOfParts.innerHTML = 0;
  resultNum.appendChild(displayNumOfParts);
  buttonNum.addEventListener("click", () => {
    count += Number(inputNum.value);
    valueNum.innerHTML = count * snp;
    // resultNum.innerHTML = bumpersNum.name;

    displayNumOfParts.innerHTML = count * snp;
    bumpersNum.numOfParts = count * snp;
    console.log(bumpersNum);
    console.log(resultNum);
    console.log(count * snp);
  });
  delNum.addEventListener("click", () => {
    valueNum.innerHTML = 0;
    displayNumOfParts.innerHTML = 0;
    count = 0;
  });

}
for(var i = 0; i < button.length; i++) {
  calcButtons(button[i], inputs[i], vals[i], delButton[i], result[i], bumperObj[i]);
}

var scrollDownButton = $("#scrollDownButton");
var scrollUpButton = $("#scrollUpButton");


// Event Listeners for the scroll button one to flip when scrolled past div and the other two with on click functions.
window.addEventListener("scroll", function() {
  var elTar = document.getElementById('totals');
  if (window.scrollY > (elTar.offsetTop + elTar.offsetHeight - 150)) {
    scrollDownButton.classList.add("hide");
    scrollUpButton.classList.remove("hide");
  }
  if (window.scrollY < (elTar.offsetTop + elTar.offsetHeight - 150)) {
    scrollUpButton.classList.add("hide");
    scrollDownButton.classList.remove("hide");
  }
});

scrollDownButton.addEventListener("click", () => {
  document.getElementById('totals').scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
});

scrollUpButton.addEventListener("click", () => {
  document.getElementById('top').scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
});

// TESTING EMAIL - DELETE IF BROKEN

document.addEventListener('deviceready', function () {
}, false);

cordova.plugins.email.isAvailable(
    function (hasAccount) {
        // alert('Service is not available') unless isAvailable;
    }
);
var emailButton = $(".email");

emailButton.addEventListener("click", function() {
  cordova.plugins.email.open({
      to:      'chris.bowmannn@googlemail.com',
      subject: 'Greetings',
      body:    '<h1>Nice greetings from Leipzig</h1>',
      isHtml:  true
  });
});
