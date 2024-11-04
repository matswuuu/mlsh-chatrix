import React from 'react';
import LeftColumn from "../../components/left/left-column.jsx";
import MiddleHeader from "../../components/middle/header/middle-header.jsx";
import MessageElement from "../../components/message/message-element.jsx";
import MessageInputWrapper from "../../components/middle/input/message-input-wrapper.jsx";
import Chat from "../../components/chat/chat.js";
import ChatItem from "../../components/left/chat-item.jsx";
import Message from "../../components/chat/message.js";
import User from "../../components/chat/user.js";
import {useNavigate} from "react-router-dom";

const ChatPage = () => {
    const navigate = useNavigate();

    const arrayOfChats = [
        new Chat("Chat name 1", 2, "", [new Message(1, "Preview message", "author", 1)]),
        new Chat("Chat name 2", 3, "", [new Message(2, "Preview message 2", "author", 1)]),
        new Chat("Chat name 3", 4, "", [])
    ]

    return (
        <div className="Transition full-height">
            <div id="Main"
                 className="opacity-transition fast right-column-not-shown right-column-not-open Transition_slide-active left-column-not-open left-column-not-shown">
                <LeftColumn chats={arrayOfChats.map(chat => <ChatItem chat={chat}/>)}/>
                <div id="MiddleColumn" className="mask-image-disabled">
                    <div className="C6IaXYew nXhZtCma"></div>
                    <div id="middle-column-portals"></div>
                    <div className="messages-layout">
                        <MiddleHeader chat={
                            new Chat("123", 123, "123", [])
                        }/>
                        <div className="Transition">
                            <div className="Transition_slide Transition_slide-active">
                                <div className="MessageList custom-scroll with-default-bg scrolled"
                                     data-normal-height="702.734375">
                                    <div className="messages-container">
                                        <div className="backwards-trigger"></div>
                                        <div className="message-date-group">
                                            {/*<div className="sticky-date interactive">*/}
                                            {/*    <span dir="auto">Today</span>*/}
                                            {/*</div>*/}

                                            <MessageElement
                                                message={new Message(1, "Preview message", new User(1, "123", "123", "123", "123", ""), 1)}
                                            />
                                        </div>
                                        {/*<div className="forwards-trigger"></div>*/}
                                        {/*<div className="fab-trigger"></div>*/}
                                    </div>
                                </div>
                                <div className="middle-column-footer">
                                    <div className="Composer shown mounted">
                                        <div className="Menu SendAsMenu">
                                            <div role="presentation" className="bubble menu-container custom-scroll opacity-transition fast not-shown not-open">
                                                <div className="send-as-title" dir="auto">Send message as...</div>
                                            </div>
                                        </div>
                                        <MessageInputWrapper/>
                                    </div>
                                    <div className="MessageSelectToolbar with-composer">
                                        <div className="MessageSelectToolbar-inner">
                                            <button type="button"
                                                    className="Button default translucent round"
                                                    aria-label="Exit select mode"
                                                    title="Exit select mode">
                                                <i className="icon icon-close"/>
                                            </button>
                                            <span className="MessageSelectToolbar-count" title="MessagesSelected">MessagesSelected</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="MiddleSearch" className="FTMljUuX visually-hidden">
                        <div className="OvmjSMwA">
                            <div className="Avatar size-medium mp1PmoMq peer-color-2" data-peer-id="-1001788085280">
                                <div className="inner">
                                    <img
                                        // src="blob:https://web.telegram.org/d8b1d6e0-192c-469f-a451-b0b9b3f8e6ea"
                                        className="Avatar__media avatar-media opacity-transition slow open shown"
                                        alt="𝕭𝕺𝕸Ж𝕱𝖀𝕮𝕶𝕰𝕽$"
                                        decoding="async"
                                        draggable="false"/>
                                </div>
                            </div>
                            <div className="SearchInput z2K8Q7ib">
                                <div className="Transition icon-container-left">
                                    <div className="Transition_slide icon-container-slide Transition_slide-active">
                                        <i className="icon icon-search search-icon" aria-hidden="true"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="rO3pH3LI"/>
                                    <div className="MFGvbICO Alee0CKy">
                                        <div className="_Yy43QLl"/>
                                    </div>
                                </div>
                                <input type="text" dir="auto" placeholder="Search" className="form-control"/>
                                <div className="Transition icon-container-right">
                                    <div className="Transition_slide icon-container-slide Transition_slide-active">
                                        <button type="button" className="Button tiny translucent round">
                                            <i className="icon icon-close" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="button"
                                        className="Button smaller translucent round"
                                        aria-label="Jump to Date"
                                        title="Jump to Date">
                                    <i className="icon icon-calendar" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;