const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");

function tickTock() {
    const date = new Date();
    const seconds = date.getSeconds() / 60;
    const minutes = (seconds + date.getMinutes()) / 60;
    const hours = (minutes + date.getHours()) / 12;

    rotateClockHand(secondHand, seconds);
    rotateClockHand(minuteHand, minutes);
    rotateClockHand(hourHand, hours);
}

function rotateClockHand(element, rotation) {
    element.style.setProperty("--rotate", rotation * 360);
}

setInterval(tickTock, 1000);

//https://www.youtube.com/watch?v=NlAw_kd2608