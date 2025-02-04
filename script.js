const chatInput = document.querySelector(".chat-input textarea");
const sendBttn = document.querySelector(".chat-input .sendbutton");
const chatbox = document.querySelector(".chatbox");

const API_KEY = "AIzaSyDzWQJiC5KVf0mELI1_qeDsHGBZI22Qdlg"
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chatHistory = []
let usrMsg;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("msg", className);
    let chatContent = className === "outgoingChat" ? `<p>${message}</p>` : `<i class="fa-solid fa-user-doctor"></i><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = async (incomingChatLi) => {
    const MessageElement = incomingChatLi.querySelector("p");

    // storing user message
    chatHistory.push({
        role: "user",
        parts: [{text: usrMsg}]
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({contents: chatHistory})
        });
        
        const botMsgdata = await response.json();
        if (!response.ok) throw new Error(botMsgdata.error.message);

        console.log(botMsgdata);
        const botMsg = botMsgdata.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        MessageElement.textContent = botMsg;
        scrollToBottom(); // Scroll to bottom after bot response
    } catch (error){
        console.log(error);
        MessageElement.classList.add("error");
        MessageElement.textContent = "Oops! Something went wrong. Please try again.";
        scrollToBottom();
    }
}

const scrollToBottom = () => {
    chatbox.scrollTop = chatbox.scrollHeight;
}

const handleChat = () => {
    usrMsg = chatInput.value.trim();
    if(!usrMsg) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(usrMsg, "outgoingChat"));
    scrollToBottom(); // Scroll to bottom after user message

    setTimeout(() =>{
        const incomingChatLi = createChatLi("Thinking...", "incomingChat", "thinking");
        chatbox.appendChild(incomingChatLi);
        scrollToBottom(); // Scroll to bottom after "Thinking..." message
        generateResponse(incomingChatLi);
    }, 300);
}

function nav(page) { 
    window.location.href=page
}

sendBttn.addEventListener("click", handleChat);