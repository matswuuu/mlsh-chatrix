import React from "react";
import PropTypes from "prop-types";
import Chat from "../chat/chat.js";

const ChatList = ({chats}) => {

    ChatList.propTypes = {
        chats: PropTypes.arrayOf(Chat).isRequired,
    };

    return (
        <div className="Transition">
            <div className="ChatFolders not-shown not-open Transition_slide Transition_slide-active">
                <div className="Transition">
                    <div className="chat-list custom-scroll Transition_slide Transition_slide-active"
                         style={{transition: "none", transform: "translate3d(0px, 0px, 0px)"}}>
                        <div className="overscroll-trigger" style={{display: "block"}}></div>
                        <div style={{position: "relative"}}>
                            {chats}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatList;