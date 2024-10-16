import React from 'react';
import "./chat.css"
import "../../component/input.css"

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
            {/* Chat header with chat name */}
            <div className="chat-header">
                <div className="chat-title">Current Chat</div>
            </div>

            {/* Message list */}
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindow;