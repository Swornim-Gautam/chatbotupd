const chatInput = document.querySelector(".chat-input textarea");
const sendBttn = document.querySelector(".chat-input .sendbutton");
const chatbox = document.querySelector(".chatbox")

let usrMsg;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add(className);
    let chatContent = className === "outgoingChat" ? `<p>${message}</p>` : `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    usrMsg = chatInput.value.trim();
    if(!usrMsg) return;

    chatbox.appendChild(createChatLi(usrMsg, "outgoingChat"));

    
}

sendBttn.addEventListener("click", handleChat)