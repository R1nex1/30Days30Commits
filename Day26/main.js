let timerDisplayElement = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmList = [];
let alarmAudio = new Audio("./sounds/kyriakos.mp3");

let initialHour = 0,
initialMinute = 0,
alarmIndex = 0;

const formatWithLeadingZero = (value) => (value < 10 ? "0" + value : value);

const findAlarmInList = (parameter, value) => {
let alarmObject,
    objIndex,
    exists = false;
alarmList.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
    exists = true;
    alarmObject = alarm;
    objIndex = index;
    return false;
    }
});
return [exists, alarmObject, objIndex];
};

function updateClockDisplay() {
let date = new Date();
let [hours, minutes, seconds] = [
    formatWithLeadingZero(date.getHours()),
    formatWithLeadingZero(date.getMinutes()),
    formatWithLeadingZero(date.getSeconds()),
];

timerDisplayElement.innerHTML = `${hours}:${minutes}:${seconds}`;

alarmList.forEach((alarm, index) => {
    if (alarm.isActive) {
    if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmAudio.play();
        alarmAudio.loop = true;
    }
    }
});
}

const formatInputValue = (inputValue) => {
inputValue = parseInt(inputValue);
if (inputValue < 10) {
    inputValue = formatWithLeadingZero(inputValue);
}
return inputValue;
};

hourInput.addEventListener("input", () => {
hourInput.value = formatInputValue(hourInput.value);
});

minuteInput.addEventListener("input", () => {
minuteInput.value = formatInputValue(minuteInput.value);
});


const addAlarmToDisplay = (alarmObj) => {
const { id, alarmHour, alarmMinute } = alarmObj;
let alarmDiv = document.createElement("div");
alarmDiv.classList.add("alarm");
alarmDiv.setAttribute("data-id", id);
alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

let checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");
checkbox.addEventListener("click", (e) => {
if (e.target.checked) {
    activateAlarm(e);
} else {
    deactivateAlarm(e);
}
});
alarmDiv.appendChild(checkbox);
let deleteButton = document.createElement("button");
deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
deleteButton.classList.add("deleteButton");
deleteButton.addEventListener("click", (e) => removeAlarmFromDisplay(e));
alarmDiv.appendChild(deleteButton);
activeAlarms.appendChild(alarmDiv);
};

setAlarm.addEventListener("click", () => {
alarmIndex += 1;

let alarmObj = {};
alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
alarmObj.alarmHour = hourInput.value;
alarmObj.alarmMinute = minuteInput.value;
alarmObj.isActive = false;
console.log(alarmObj);
alarmList.push(alarmObj);
addAlarmToDisplay(alarmObj);
hourInput.value = formatWithLeadingZero(initialHour);
minuteInput.value = formatWithLeadingZero(initialMinute);
});

const activateAlarm = (e) => {
let searchId = e.target.parentElement.getAttribute("data-id");
let [exists, obj, index] = findAlarmInList("id", searchId);
if (exists) {
alarmList[index].isActive = true;
}
};

const deactivateAlarm = (e) => {
let searchId = e.target.parentElement.getAttribute("data-id");
let [exists, obj, index] = findAlarmInList("id", searchId);
if (exists) {
alarmList[index].isActive = false;
alarmAudio.pause();
}
};

const removeAlarmFromDisplay = (e) => {
let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
let [exists, obj, index] = findAlarmInList("id", searchId);
if (exists) {
e.target.parentElement.parentElement.remove();
alarmList.splice(index, 1);
}
};

window.onload = () => {
setInterval(updateClockDisplay);
initialHour = 0;
initialMinute = 0;
alarmIndex = 0;
alarmList = [];
hourInput.value = formatWithLeadingZero(initialHour);
minuteInput.value = formatWithLeadingZero(initialMinute);
};

// https://blog.stackademic.com/alarm-app-javascript-with-multiple-alarm-feature-javascript-project-abfe4eefb22c