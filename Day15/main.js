const generateBtn = document.querySelector(".generate")
const display = document.querySelector(".display")

generateBtn.addEventListener("click", () => {
    generatePassword();
})

function generatePassword() {
    const minLength = 16;
    const maxLength = 24;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%&+-"
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }


    display.querySelector("p").textContent = password;
}