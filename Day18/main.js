let rate_1 = document.querySelector(".rate_1");
let rate_2 = document.querySelector(".rate_2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelectorAll(".options select");
let sel_1 = selects[0];
let sel_2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let input_1 = inputs[0];
let input_2 = inputs[1];

let rates = {};

let requestURL = "http://data.fixer.io/api/latest?access_key=your_api_key_here";

fetchRates();

async function fetchRates() {
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    populateOptions();
}

function populateOptions() {
    let val = "";
    Object.keys(rates).forEach(code => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    })
    selects.forEach(s => (s.innerHTML = val));
}

function convert(val, fromCurr, toCurr) {
    let v = (val/rates[fromCurr] * rates[toCurr]);
    let v1 = v.toFixed(3);
    return v1 == 0.0 ? v.toFixed(5) : v1;
}

function displayRates() {
    let v1 = sel_1.value;
    let v2 = sel_2.value;

    let val = convert(1, v1, v2);

    rate_1.innerHTML = `1 ${v1} equals`;
    rate_2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener("click", () => {
    let fromCurr = sel_1.value;
    let fromVal = parseFloat(input_1.value);
    let toCurr = sel_2.value;

    if(isNaN(fromVal)) {
        alert("Enter a Number");
    }
    else {
        let cVal = convert(fromVal, fromCurr, toCurr);
        input_2.value = cVal;
    }
});

selects.forEach(s => s.addEventListener("change", displayRates));

document.querySelector(".swap").addEventListener("click", () => {
    let in_1 = input_1.value;
    let in_2 = input_2.value;
    let op_1 = sel_1.value;
    let op_2 = sel_2.value;

    input_2.value = in_1;
    input_1.value = in_2;

    sel_2.value = op_1;
    sel_1.value = op_2;
    displayRates();
})