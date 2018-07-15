// functions for querySelector and createElement

function $(el) {
  return document.querySelector(el);
}
function create(el) {
  return document.createElement(el);
}

// array of bumper names
var selectArr = []
var bumpers = ["724 Rear Lower", "724 Front Lower", "724 Front Upper", "B12P Rear", "724 Rear Upper", "B12P Front", "083 High Grade Rear", "083 Low Grade Rear", "GD1A GT Front", "GD1A Sport Lower", "GD1A Lower 1", "GD1A Twin Lower", "083 Front", "Nismo Rear", "GD1A All Road Front", "GD1A All Road Rear", "GD1A Sport Front" ];
bumpers.sort(function(a, b) {
  if(a < b) return -1;
  if(a > b) return 1;
  return 0;
})
// creating object of all bumpers including name and number of parts
var bumperObj = [];
for(var i = 0; i < bumpers.length; i++) {
  bumperObj[i] = {name: bumpers[i], numOfParts: "0"}
}

console.log(bumperObj);

var form = document.createElement("form");
form.setAttribute("method", "post");

var totalsDiv = $(".totals");

for(var i = 0; i < bumpers.length; i++) {
  var label = create("label");
  label.setAttribute("for", bumpers[i]);
  label.innerHTML = bumpers[i];

  var select = create("select");
  form.append(label)
  label.appendChild(select);
  select.classList.add("select");
  selectArr.push(select);

  var calc = create("button");
  calc.innerHTML = "Calculate";
  calc.setAttribute("type", "button");
  calc.classList.add("calc");
  label.appendChild(calc);

  var del = create("button");
  del.innerHTML = "Delete";
  del.setAttribute("type", "button");
  del.classList.add("del");
  label.appendChild(del);

  var val = create("div");
  val.innerHTML = 0;
  val.classList.add("values");
  label.appendChild(val);

  var result = create("div");
  result.innerHTML = bumpers[i] + ": ";
  result.classList.add("result");
  totalsDiv.appendChild(result);

  for(var j = 0; j < 100; j++){
    var option = document.createElement("option");

    option.text = j
    select.appendChild(option);
  };
}
var button = document.getElementsByClassName("calc");
var delButton = document.getElementsByClassName("del");
var inputs = document.getElementsByClassName("select");
var vals = document.getElementsByClassName("values");
var result = document.getElementsByClassName("result");


$(".container").appendChild(form);

function calcButtons(buttonNum, inputNum, valueNum, delNum, resultNum, bumpersNum) {
  var  count = 0;
  var parts = 0;
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
  displayNumOfParts.classList.add("partsDisplay")
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
    count = 0;
  });
};
for(var i = 0; i < button.length; i++) {
  calcButtons(button[i], inputs[i], vals[i], delButton[i], result[i], bumperObj[i]);
}
