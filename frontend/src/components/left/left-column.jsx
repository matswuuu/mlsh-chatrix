import ChatSearch from "./search/chat-search.jsx";
import ChatList from "./chat-list.jsx";
import React, {Component, useRef} from "react";

export default class LeftColumn extends Component {

    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    addChat = (chat) => {
        this.listRef.current.addChat(chat);
    }

    render() {
        return (
            <div id="LeftColumn" className="Transition">
                <div id="LeftColumn-main" className="Transition_slide Transition_slide-active">
                    <ChatSearch/>
                    <ChatList ref={this.listRef}/>
                </div>
            </div>
        );
    }
}
