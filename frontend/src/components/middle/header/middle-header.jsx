import React, {Component, useState} from "react";
import ChatInfo from "./chat-info.jsx";
import BackButton from "./back-button.jsx";
import PropTypes from "prop-types";
import Chat from "../../../data/chat/chat.js";
import MessageElement from "../message/message-element.jsx";

export default class MiddleHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    setCurrentChat = (chat) => {
        localStorage.setItem("current_chat", chat.id);
        this.setState(() => ({
            chat: <ChatInfo chat={chat}/>
        }));
    }

    render() {
        return (
            <div className="MiddleHeader">
                <div className="Transition">
                    <div className="Transition_slide Transition_slide-active">
                        <BackButton/>
                        {this.state.chat}
                    </div>
                </div>
                <div className="header-tools">
                    <div className="HeaderActions">
                        <button type="button"
                                className="Button smaller translucent round"
                                aria-label="Search this chat"
                                title="Search this chat">
                            <i className="icon icon-search" aria-hidden="true"/>
                        </button>
                        <button type="button"
                                className="Button smaller translucent round has-ripple"
                                aria-label="More actions"
                                title="More actions">
                            <i className="icon icon-more" aria-hidden="true"/>
                            <div className="ripple-container"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}