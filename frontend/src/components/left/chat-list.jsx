import React, {Component} from "react";
import PropTypes from "prop-types";
import Chat from "../../data/chat/chat.js";
import ChatSearch from "./search/chat-search.jsx";
import ChatItem from "./chat-item.jsx";

class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    addChat(chat) {
        this.setState((prevState) => ({
            list: [...prevState.list, chat]
        }));
    }

    render() {
        return (
            <div className="Transition">
                <div className="ChatFolders not-shown not-open Transition_slide Transition_slide-active">
                    <div className="Transition">
                        <div className="chat-list custom-scroll Transition_slide Transition_slide-active"
                             style={{transition: "none", transform: "translate3d(0px, 0px, 0px)"}}>
                            <div className="overscroll-trigger" style={{display: "block"}}></div>
                            <div style={{position: "relative"}}>
                                {this.state.list.map((chat, index) => (
                                    <div key={index}>{chat}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatList;