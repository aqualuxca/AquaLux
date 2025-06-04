    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatBot = document.getElementById('chat-bot');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatBox = document.getElementById('chat-box');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');

    const backendUrl = 'https://aqualux.pythonanywhere.com/'; // Update with your actual domain

    chatbotIcon.addEventListener('click', () => {
        chatBot.style.display = 'flex';
        chatbotIcon.style.display = 'none';
    });

    closeChatbot.addEventListener('click', () => {
        chatBot.style.display = 'none';
        chatbotIcon.style.display = 'block';
    });

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

            addTypingIndicator();

            fetch(`${backendUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message }),
            })
                .then(response => response.json())
                .then(data => {
                    removeTypingIndicator();
                    if (data.response) {
                        addMessage(data.response, false);
                    } else if (data.error) {
                        addMessage(`Error: ${data.error}`, false);
                    }
                })
                .catch(() => {
                    removeTypingIndicator();
                    addMessage('Error: Unable to communicate with the server.', false);
                });
        }
    }

    function addMessage(message, isUser) {
        const messageContainer = document.createElement('div');
        messageContainer.className = isUser ? 'person-b' : 'person-a';

        if (!isUser) {
            const botImage = document.createElement('img');
            botImage.src = 'assets/jetski.jpg'; // Replace with the path to your bot's image
            botImage.alt = 'AI';
            messageContainer.appendChild(botImage);
        }

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;

        messageContainer.appendChild(messageElement);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'person-a';
        typingIndicator.id = 'typing-indicator';

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = 'Typing...';

        typingIndicator.appendChild(messageElement);
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) chatBox.removeChild(typingIndicator);
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetch(`${backendUrl}/initial_message`)
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    addMessage(data.response, false);
                }
            })
            .catch(() => {
                addMessage('Error: Unable to load initial message.', false);
            });
    });
