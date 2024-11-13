import React, {useState} from "react";
import "./new-chat.css"
import {useTranslation} from "react-i18next";
import {gql, useMutation} from "@apollo/client";
import chat from "../../../data/chat/chat.js";

const CREATE_NEW_CHAT = gql`
    mutation CreateNewChat($token: String!, $chatName: String!) {
        createNewChat(token: $token, chatName: $chatName) {
            id
            name
            members
        }
    }
`

const NewChat = () => {
    const [t] = useTranslation();
    const [chatName, setChatName] = useState("");

    const [createNewChat] = useMutation(CREATE_NEW_CHAT, {
        onCompleted: (data) => {
            console.log(data)
        }
    });

    return (
        <div id="new-chat" className="new-chat">
            <div className="new-chat-header">
                <h3>{t("chat.new-chat.create-new-chat")}</h3>
            </div>
            <div className="NewChat-inner step-2">
                <div className="input-group with-label">
                    <input className="form-control"
                           type="text"
                           dir="auto"
                           aria-label={t("chat.new-chat.chat-name")}
                           placeholder={t("chat.new-chat.chat-name")}
                           onChange={(event) => {
                               setChatName(event.target.value);
                           }}/>
                </div>
            </div>
            <button type="button"
                    className="Button default primary no-upper-case"
                    aria-label={t("chat.new-chat.create-chat")}
                    title={t("chat.new-chat.create-chat")}
                    onClick={async event => {
                        event.preventDefault();
                        if (chatName === "") return;

                        document.getElementById("new-chat").remove();

                        await createNewChat({
                            variables: {
                                token: localStorage.getItem("token"),
                                chatName: chatName
                            }
                        });
                    }}>
                {t("chat.new-chat.create-chat")}
            </button>
        </div>
    );
}

export default NewChat;