import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import AuthorizationInput, {
    setError,
    setNone, validatePassword,
    validateUsername
} from "../authorization/authorization-input.jsx";
import "./chat.css"
import ChatList from "./chat-list.jsx";
import MessageInput from "./c.jsx";
import ChatWindow from "./chat-window.jsx";

const ChatPage = () => {
    const {t} = useTranslation();

    const currentChat = "test"
    const setCurrentChat = (v) => console.log(v)
    const chatList = {
        "test": "test"
    }
    const [messages, setMessages] = useState({
        'test': ['Hello from Chat 1!'],
        'Chat 2': ['Hey, this is Chat 2!'],
        'Chat 3': ['Welcome to Chat 3!']
    });
    return (
        // <div>
        //
        //     <div className="chat-groups">
        //
        //     </div>
        //     <div className="chats">
        //
        //     </div>
        //     <div className="chat">
        //
        //     </div>
        // </div>

        <div className="messenger">
            <ChatList
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                chatList={Object.keys(messages)}
            />

            {/* Right Side: Current Chat */}
            <div className="chat-area">
                <ChatWindow messages={messages[currentChat]}/>
                <MessageInput/>
            </div>
        </div>
    )
}

export default ChatPage;