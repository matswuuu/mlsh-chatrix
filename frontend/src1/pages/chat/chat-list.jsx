import React, {useState} from 'react';
import "./chat.css"
import "../../component/input.css"

const ChatList = ({ currentChat, setCurrentChat, chatList }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter the chat list based on the search term
    const filteredChats = chatList.filter((chat) =>
        chat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chat-list">
            <div className="input">
                <input
                    type="text"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul>
                {filteredChats.map((chat, index) => (
                    <li
                        key={index}
                        className={chat === currentChat ? 'active' : ''}
                        onClick={() => setCurrentChat(chat)}
                    >
                        {chat}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;