import React from "react";
import ChatInfo from "./chat-info.jsx";
import BackButton from "./back-button.jsx";
import PropTypes from "prop-types";
import Chat from "../../chat/chat.js";

const MiddleHeader = ({chat}) => {

    MiddleHeader.propTypes = {
        chat: PropTypes.objectOf(Chat).isRequired,
    }

    return (
        <div className="MiddleHeader">
            <div className="Transition">
                <div className="Transition_slide Transition_slide-active">
                    <BackButton/>
                    <ChatInfo chat={chat} />
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

export default MiddleHeader;