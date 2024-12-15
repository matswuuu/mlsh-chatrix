import React, {useRef, useState} from 'react';
import MessageElement from "../../components/middle/message/message-element.jsx";
import MessageInputWrapper from "../../components/middle/input/message-input-wrapper.jsx";
import ChatItem from "../../components/left/chat-item.jsx";
import LeftColumn from "../../components/left/left-column.jsx";
import {gql, useQuery, useSubscription} from "@apollo/client";
import MiddleHeader from "../../components/middle/header/middle-header.jsx";
import UserProfile from "../../components/center/user-profile/user-profile.jsx";

const GET_CHATS_BY_USER_ID = gql`
    query ChatsByUserId($id: ID!) {
        chatsByUserId(id: $id) {
            id
            name
            members
            role
            sendOptions {
                value
                name
            }
        }
    }
`;

const NEW_MESSAGES_SUBSCRIPTION = gql`
    subscription NewMessages($token: String!, $lastMessages: [String]) {
        newMessages(token: $token, lastMessages: $lastMessages) {
            content
            chatId
            authorId
            timestamp
        }
    }
`

const ChatPage = () => {
    const [loadedChatsMessages, setLoadedChatsMessages] = useState({});
    const [currentMessages, setCurrentMessages] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [overlayElements, setOverlayElements] = useState([]);
    const [messageInput, setMessageInput] = useState(false);
    const [ sendOptions, setSendOptions] = useState([]);

    const leftColumnRef = useRef(null);
    const middleHeaderRef = useRef(null);

    const sortChats = () => {
        // const b = Object.entries(loadedChatsMessages)
        //     .filter((message) => {
        //         console.log(message[1])
        //     })
        //     .sort((a, b) => a[1].timestamp - b[1].timestamp)
        //
        // console.log(b[0])
    }

    useSubscription(NEW_MESSAGES_SUBSCRIPTION, {
        shouldResubscribe: true,
        variables: {
            token: localStorage.getItem("token"),
            lastMessages: Object.keys(loadedChatsMessages)
                .map((key) => `${key}:${loadedChatsMessages[key].length - 1}`)
        },
        onError: (error) => {
            console.error(error)
        },
        onData: ({data}) => {
            data.data["newMessages"].forEach((rawMessage) => {
                const chatId = rawMessage.chatId;
                let loadedMessages = loadedChatsMessages[chatId];

                const message = <MessageElement
                    key={`message-${chatId}:${loadedMessages.length}`}
                    message={rawMessage}
                    onAvatarClick={(event) => {
                        event.preventDefault();
                        const userProfile = <UserProfile
                            userId={rawMessage.authorId}
                            onBack={(event) => {
                                event.preventDefault();
                                overlayElements.splice(overlayElements.indexOf(userProfile), 1);
                                setOverlayElements(overlayElements)
                            }}
                        />;
                        setOverlayElements([...overlayElements, userProfile]);
                    }}
                />
                loadedMessages = loadedMessages.concat(message);
                loadedChatsMessages[chatId] = loadedMessages;

                setLoadedChatsMessages(loadedChatsMessages);
                if (currentChatId === chatId) setCurrentMessages(loadedChatsMessages[chatId]);

                sortChats();
            })
        },
    });

    useQuery(GET_CHATS_BY_USER_ID, {
        variables: {
            id: localStorage.getItem("user_id")
        },
        onCompleted: (data) => {
            data["chatsByUserId"].forEach((chat) => {
                loadedChatsMessages[chat.id] = []
                setLoadedChatsMessages(loadedChatsMessages)
            })

            data["chatsByUserId"]
                .map((chat) => <ChatItem
                    chat={chat}
                    onClick={(event) => {
                        event.preventDefault();

                        setSendOptions(chat.sendOptions)
                        setCurrentMessages([]);
                        setCurrentMessages(loadedChatsMessages[chat.id]);
                        setCurrentChatId(chat.id);
                        setMessageInput(chat.role <= localStorage.getItem("role"))
                        middleHeaderRef.current.setCurrentChat(chat);
                    }}
                />)
                .forEach((chat) => {
                    leftColumnRef.current.addChat(chat)
                })

            sortChats();
        },
        onError: (error) => {
            console.debug(error);
        }
    });

    return (
        <div className="Transition full-height">
            {overlayElements}
            <div id="Main"
                 className="opacity-transition fast right-column-not-shown right-column-not-open Transition_slide-active left-column-not-open left-column-not-shown">
                <LeftColumn ref={leftColumnRef}/>

                <div id="MiddleColumn">
                    <div className="C6IaXYew nXhZtCma"/>
                    <div id="middle-column-portals"/>
                    <div className="messages-layout">
                        <MiddleHeader ref={middleHeaderRef}/>
                        <div className="Transition">
                            <div className="Transition_slide Transition_slide-active">
                                <div className="MessageList custom-scroll with-default-bg scrolled"
                                     data-normal-height="702.734375">
                                    <div className="messages-container">
                                        <div className="backwards-trigger"/>
                                        <div className="message-date-group">{currentMessages}</div>
                                    </div>
                                </div>
                                <div className="middle-column-footer">
                                    <div className="Composer shown mounted">
                                        {messageInput ? <MessageInputWrapper options={sendOptions}/> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="MiddleSearch" className="FTMljUuX visually-hidden">
                        <div className="OvmjSMwA">
                            <div className="Avatar size-medium mp1PmoMq peer-color-2"
                                 data-peer-id="-1001788085280">
                                <div className="inner">
                                    <img
                                        // src="blob:https://web.telegram.org/d8b1d6e0-192c-469f-a451-b0b9b3f8e6ea"
                                        className="Avatar__media avatar-media opacity-transition slow open shown"
                                        alt=""
                                        decoding="async"
                                        draggable="false"/>
                                </div>
                            </div>
                            <div className="SearchInput z2K8Q7ib">
                                <div className="Transition icon-container-left">
                                    <div
                                        className="Transition_slide icon-container-slide Transition_slide-active">
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
                                    <div
                                        className="Transition_slide icon-container-slide Transition_slide-active">
                                        <button type="button" className="Button tiny translucent round">
                                            <i className="icon icon-close" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;