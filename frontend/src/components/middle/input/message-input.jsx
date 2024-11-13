import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {gql, useMutation} from "@apollo/client";

const SEND_MESSAGE = gql`
    mutation SendMessage($token: String!, $chatId: Int!, $content: String!) {
        sendMessage(token: $token, chatId: $chatId, content: $content) {
            content
            authorId
            timestamp
        }
    }
`

const MessageInput = () => {
    const {t} = useTranslation();

    const [placeholder, setPlaceholder] = useState(t("chat.message-input"));
    const placeholderTextRef = useRef(null);

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error("error", error);
        }
    });

    useEffect(() => {
        placeholderTextRef.current = document.getElementById("message-placeholder-text");
    })

    const updatePlaceholder = (content) => {
        setPlaceholder(content === "" ? t("chat.message-input") : "");
    }

    return (
        <div id="message-input-text">
            <div className="custom-scroll input-scroller">
                <div className="input-scroller-content">
                    <div id="editable-message-text"
                         className="form-control allow-selection"
                         contentEditable="true"
                         role="textbox"
                         dir="auto"
                         tabIndex="0"
                         style={{transition: "color 50ms linear !important"}}
                         onInput={event => {
                             event.preventDefault();
                             updatePlaceholder(event.currentTarget.textContent);
                         }}
                         onKeyDown={(event) => {
                             const key = event.key;
                             if (key !== "Enter") return;

                             event.preventDefault();
                             sendMessage({
                                 variables: {
                                     token: localStorage.getItem("token"),
                                     chatId: parseInt(localStorage.getItem("current_chat")),
                                     content: event.currentTarget.textContent
                                 }
                             });

                             updatePlaceholder("")
                             event.currentTarget.textContent = "";
                         }}
                    />
                    <span id="message-placeholder-text" className="placeholder-text" dir="auto">
                        {placeholder}
                    </span>
                    <canvas className="shared-canvas"/>
                    <canvas className="shared-canvas"/>
                    <div className="absolute-video-container"/>
                </div>
            </div>
            <div className="custom-scroll input-scroller clone">
                <div className="input-scroller-content">
                    <div className="form-control allow-selection clone" dir="auto"/>
                </div>
            </div>
        </div>
    );
}

export default MessageInput;