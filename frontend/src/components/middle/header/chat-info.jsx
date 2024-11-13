import React from "react";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Chat from "../../../data/chat/chat.js";

const ChatInfo = ({chat}) => {
    const {t} = useTranslation();

    return (
        <div className="chat-info-wrapper">
            <div className="ChatInfo">
                <div className="Avatar size-medium peer-color-2 interactive">
                    <div className="inner">
                        <img
                            src={chat ? chat.image : ""}
                            className="Avatar__media avatar-media opacity-transition slow open shown"
                            alt={chat ? chat.name : ""}
                            decoding="async"
                            draggable="false"/>
                    </div>
                </div>
                <div className="info">
                    <div className="title QljEeKI5">
                        <h3 dir="auto" role="button" className="fullName AS54Cntu SgogACy_">{chat ? chat.name : ""}</h3>
                    </div>
                    <span className="status">
                        <span className="group-status">
                            {t("chat.header.members-amount", { members: `${chat ? chat.members.length : 0}` })}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChatInfo;