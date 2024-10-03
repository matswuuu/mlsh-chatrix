import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import AuthorizationInput, {
    setError,
    setNone, validatePassword,
    validateUsername
} from "../../component/authorization/authorization-input.jsx";

const ChatPage = () => {
    const {t} = useTranslation();

    return (
        <div>

            <div className="chat-groups">

            </div>
            <div className="chats">

            </div>
            <div className="chat">

            </div>
        </div>
    )
}

export default ChatPage;