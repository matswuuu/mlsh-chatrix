import ChatSearch from "./chat-search.jsx";
import ChatList from "./chat-list.jsx";
import React from "react";
import PropTypes from "prop-types";
import Chat from "../chat/chat.js";

const LeftColumn = ({chats}) => {

    LeftColumn.propTypes = {
        chats: PropTypes.arrayOf(Chat).isRequired,
    };

    return (
        <div id="LeftColumn" className="Transition">
            <div id="LeftColumn-main" className="Transition_slide Transition_slide-active">
                <ChatSearch/>
                <ChatList chats={chats}/>
            </div>
        </div>
    );
}

export default LeftColumn;