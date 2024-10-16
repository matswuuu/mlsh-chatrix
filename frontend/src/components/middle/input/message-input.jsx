import React, {useTransition} from "react";
import i18n from "i18next";
import {useTranslation} from "react-i18next";

const MessageInput = () => {
    const {t} = useTranslation();

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
                         aria-label={t("chat.message-input")}
                         style={{transition: "color 50ms linear !important"}}
                    />
                    <span className="placeholder-text" dir="auto">{t("chat.message-input")}</span>
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