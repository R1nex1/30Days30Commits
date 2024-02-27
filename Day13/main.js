let isDarkMode = false;
const darkModeSwitch = document.querySelector(".switch")

darkModeSwitch.addEventListener('click', () => {
    themeSwap();
})

function themeSwap() {
    const container = document.querySelector(".container");
    const textSwitch = document.getElementById("textSwitch");

    if (isDarkMode) {
        container.style.background = "var(--clr-white)";
        textSwitch.textContent = 'Lightmode';
        textSwitch.style.color = '#000';
    } else {
        container.style.background = "var(--clr-black)";
        textSwitch.textContent = 'Darkmode';
        textSwitch.style.color = '#fff';
    }

    isDarkMode = !isDarkMode; 
}