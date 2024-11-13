import React from "react";
import PropTypes from "prop-types";
import Chat from "../../data/chat/chat.js";

const ChatItem = ({chat, onClick}) => {

    const getPreviewMessage = (messages) => {
        return messages != null && messages.length > 0 ? messages[0] : "";
    }

    return (
        <div className="ListItem sG8AAzvK chat-item-clickable chat-item-archive"
             onClick={onClick}>
            <div className="ListItem-button bNkLqJf1" role="button" tabIndex="0">
                <div className="status RMY__Znz">
                    <div className="Avatar qeb0Aox1">
                        <i className="icon icon-archive-filled"/>
                    </div>
                </div>
                <div className="OS2LWzdu info">
                    <div className="info-row">
                        <div className="title rMTpNazX">
                            <h3 dir="auto" className="bkCtPuPQ fullName">{chat.name}</h3>
                        </div>
                    </div>
                    <div className="subtitle">
                        <div className="status _1817Hwgd">
                            {/*<span className="">{getPreviewMessage(chat.messages).content}</span>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItem;