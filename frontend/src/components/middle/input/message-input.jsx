import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";

const MessageInput = () => {
    const {t} = useTranslation();

    const [placeholder, setPlaceholder] = useState(t("chat.message-input"));
    const placeholderTextRef = useRef(null);

    useEffect(() => {
        placeholderTextRef.current = document.getElementById("message-placeholder-text");
    })

    const updatePlaceholder = (content) => {
        setPlaceholder(content === "" ? t("chat.message-input") : "");
    }

    const sendMessage = (content) => {

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
                         onKeyDown={event => {
                             const key = event.key;
                             if (key !== "Enter") return;

                             event.preventDefault();
                             event.currentTarget.textContent = "";
                             updatePlaceholder("")
                             sendMessage(event);
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