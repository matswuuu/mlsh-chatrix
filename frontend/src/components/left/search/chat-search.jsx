import React from "react";
import {useTranslation} from "react-i18next";
import "./chat-search.css"

const ChatSearch = () => {
    const {t} = useTranslation();

    return (
        <div className="LeftMainHeader">
            <div id="LeftMainHeader" className="left-header">
                <div className="SearchInput">
                    <div className="Transition icon-container-left">
                        <div className="Transition_slide icon-container-slide Transition_slide-active">
                            <i className="icon icon-search search-icon" aria-hidden="true"/>
                        </div>
                    </div>
                    <input id="telegram-search-input"
                           type="text"
                           dir="auto"
                           placeholder={t("chat.search-chat")}
                           className="form-control"
                           autoComplete="off"
                    />
                    <div className="Transition icon-container-right"/>
                </div>
            </div>
        </div>
    );
}

export default ChatSearch;