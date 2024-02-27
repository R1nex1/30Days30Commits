const clearElement = document.getElementById("clearElement");
const clear = document.getElementById("clear");
const divide = document.getElementById("divide");
const times = document.getElementById("times");
const numSeven = document.getElementById("numSeven");
const numEight = document.getElementById("numEight");
const numNine = document.getElementById("numNine");
const minus = document.getElementById("minus");
const numFour = document.getElementById("numFour");
const numFive = document.getElementById("numFive");
const numSix = document.getElementById("numSix");
const plus = document.getElementById("plus");
const numOne = document.getElementById("numOne");
const numTwo = document.getElementById("numTwo");
const numThree = document.getElementById("numThree");
const point = document.getElementById("point");
const squared = document.getElementById("squared");
const numZero = document.getElementById("numZero");
const sqrt = document.getElementById("sqrt");
const equals = document.getElementById("equals");


let input = '';
let result = '';

clearElement.addEventListener('click', () => {
    input = input.slice(0, -1);
    updateDisplay();
});
clear.addEventListener('click', () => {
    input = '';
    updateDisplay();
});
divide.addEventListener('click', () => {
    input += '/';
    updateDisplay();
});
times.addEventListener('click', () => {
    input += '*';
    updateDisplay();
});
numSeven.addEventListener('click', () => {
    input += '7';
    updateDisplay();
});
numEight.addEventListener('click', () => {
    input += '8';
    updateDisplay();
});
numNine.addEventListener('click', () => {
    input += '9';
    updateDisplay();
});
minus.addEventListener('click', () => {
    input += '-';
    updateDisplay();
});
numFour.addEventListener('click', () => {
    input += '4';
    updateDisplay();
});
numFive.addEventListener('click', () => {
    input += '5';
    updateDisplay();
});
numSix.addEventListener('click', () => {
    input += '6';
    updateDisplay();
});
plus.addEventListener('click', () => {
    input += '+';
    updateDisplay();
});
numOne.addEventListener('click', () => {
    input += '1';
    updateDisplay();
});
numTwo.addEventListener('click', () => {
    input += '2';
    updateDisplay();
});
numThree.addEventListener('click', () => {
    input += '3';
    updateDisplay();
});
point.addEventListener('click', () => {
    input += '.';
    updateDisplay();
});
squared.addEventListener('click', () => {
    if (input !== '') {
        input = Math.pow(parseFloat(input), 2).toString();
        updateDisplay();
    }
});
numZero.addEventListener('click', () => {
    input += '0';
    updateDisplay();
});
sqrt.addEventListener('click', () => {
    if (input !== '') {
        input = Math.sqrt(parseFloat(input), 2).toString();
        updateDisplay();
    }
});
equals.addEventListener('click', () => {
    calculate();
    input = result.toString();
    updateDisplay();
});

function updateDisplay() {
    document.querySelector('.display p').textContent = input;
}

function calculate() {
    result = eval(input);
    document.querySelector('.display p').textContent = result;
}