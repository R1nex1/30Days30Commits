const kadiSelectorBtn = document.querySelector('#kadi-select');
const matiSelectorBtn = document.querySelector('#mati-select');
const convHeader = document.querySelector('.conversation-header');
const convMsg = document.querySelector('.messages-container');
const convInputForm = document.querySelector('.input-form');
const convInput = document.querySelector('.input-field');
const clearConvBtn = document.querySelector('.clear-conversation-btn');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
<div class="chat-message ${message.sender === 'Kadi' ? 'message-blue' : 'message-gray'}">
    <div class="sender-name">${message.sender}</div>
    <div class="text-content">${message.text}</div>
    <div class="time-stamp">${message.timestamp}</div>
</div>
`;

window.onload = () => {
    messages.forEach((message) => {
        convMsg.innerHTML += createChatMessageElement(message);
    });
};

let messageSender = 'Kadi';

const updateMessageSender = (name) => {
    messageSender = name;
    convHeader.innerText = `${messageSender} chatting...`;
    convInput.placeholder = `Type here, ${messageSender}...`;

    if (name === 'Kadi') {
        kadiSelectorBtn.classList.add('is-active');
        matiSelectorBtn.classList.remove('is-active');
    }
    if (name === 'Mati') {
        matiSelectorBtn.classList.add('is-active');
        kadiSelectorBtn.classList.remove('is-active');
    }

    convInput.focus();
};

kadiSelectorBtn.onclick = () => updateMessageSender('Kadi');
matiSelectorBtn.onclick = () => updateMessageSender('Mati');

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
        sender: messageSender,
        text: convInput.value,
        timestamp,
    };

    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    convMsg.innerHTML += createChatMessageElement(message);

    convInputForm.reset();

    convMsg.scrollTop = convMsg.scrollHeight;
};

convInputForm.addEventListener('submit', sendMessage);

clearConvBtn.addEventListener('click', () => {
    localStorage.clear();
    convMsg.innerHTML = '';
});