function billInputHandler(event) {

  if(!event.target.value){
    bill = 0;
  } else{
    bill = parseFloat(event.target.value);
  }

  calculateTip();
}

function peopleInputHandler(event) {


  if(event.target.value === "0"){
    peopleLabel.classList.add("label--error");
    event.target.classList.add("input--error");
    people = 0;
    calculateTip();
    return;
  }

  peopleLabel.classList.remove("label--error");
  event.target.classList.remove("input--error");

  if(!event.target.value){
    people = 0;
  } else {
    people = parseFloat(event.target.value);
  }


  calculateTip();

}


function buttonHandler(event) {

  [...buttons].filter(element => element !== event.target)
  .forEach(element => element.classList.remove('tipping__button--active'));

  tippingCustom.value = "";

  let containsClass = event.target.classList.contains('tipping__button--active');

  percent = containsClass ? 0 : parseFloat(event.target.innerText.replace('%', ''));

  event.target.classList.toggle('tipping__button--active');
  calculateTip();

}

function tippingCustomHandler(event) {

  [...buttons].forEach(element => element.classList.remove('tipping__button--active'));

  if(!event.target.value){
    percent = 0;
  } else{
    percent = parseFloat(event.target.value);
  }

  calculateTip();
}


function calculateTip() {

  if(people == 0){
    tipAmount.innerText = total.innerText = "0.00";
    return;
  }

  tipAmount.innerText = ((bill*(percent/100))/people).toFixed(2);
  total.innerText = ((bill + (bill*(percent/100)))/people).toFixed(2);

}


function resetHandler(event) {
  billInput.value = tippingCustom.value = peopleInput.value = "";
  bill = people = percent = 0;

  [...buttons].forEach(element => element.classList.remove('tipping__button--active'));

  peopleLabel.classList.remove("label--error");
  peopleInput.classList.remove("input--error");

  tipAmount.innerText = total.innerText = "0.00";
}


const billInput = document.querySelector('.bill__input');
const tippingCustom = document.querySelector('.tipping__custom');
const peopleInput = document.querySelector('.people__input');
const buttons = document.querySelectorAll('.tipping__button');
const resetButton = document.querySelector('.button');
const peopleLabel = document.querySelector(".people__label");
const tipAmount = document.querySelector('#tipAmount');
const total = document.querySelector('#total');


let bill = 0;
let people = 0;
let percent = 0;


billInput.addEventListener('input', billInputHandler);
tippingCustom.addEventListener('input', tippingCustomHandler);
peopleInput.addEventListener('input', peopleInputHandler);
resetButton.addEventListener('click', resetHandler);
buttons.forEach(element => {
  element.addEventListener('click', buttonHandler)
});

