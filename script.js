const chatInput = document.querySelector(".chat-input textarea");
const sendBttn = document.querySelector(".chat-input .sendbutton");
const chatbox = document.querySelector(".chatbox")

let usrMsg;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("msg", className);
    let chatContent = className === "outgoingChat" ? `<p>${message}</p>` : `<i class="fa-solid fa-user"></i><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    usrMsg = chatInput.value.trim();
    if(!usrMsg) return;

    chatbox.appendChild(createChatLi(usrMsg, "outgoingChat"));

    setTimeout(() =>{
        chatbox.appendChild(createChatLi("Thinking...", "incomingChat"));
    }, 600);
}

sendBttn.addEventListener("click", handleChat)