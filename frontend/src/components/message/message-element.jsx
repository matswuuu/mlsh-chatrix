import React from "react";

const MessageElement = ({message}) => {
    return (
        <div id={message.id}
             className="Message message-list-item allow-selection last-in-group last-in-list shown open"
             data-message-id={message.id}>
            <div className="bottom-еmarker" data-message-id={message.id}
                 data-should-update-views="false"></div>
            <div className="message-select-control"></div>
            <div className="Avatar size-small peer-color-4 interactive" data-peer-id="623689175">
                <div className="inner">
                    <img
                        src={message.author.image}
                        className="Avatar__media avatar-media opacity-transition slow open shown"
                        alt={message.author.firstName} decoding="async" draggable="false"
                    />
                </div>
            </div>
            <div className="message-content-wrapper can-select-text">
                <div
                    className="message-content peer-color-4 text has-shadow has-solid-background has-appendix has-footer" dir="auto">
                    <div className="content-inner" dir="auto">
                        <div className="text-content clearfix with-meta" dir="auto">
                            {message.content}
                            <span className="MessageMeta" dir="ltr" data-ignore-on-paste="true">
                                <span className="message-time">{message.getFormatedDate()}</span>
                            </span>
                        </div>
                    </div>
                    <div className="message-action-buttons"></div>
                    <svg width="9" height="20" className="svg-appendix">
                        <defs>
                            <filter x="-50%" y="-14.7%" width="200%" height="141.2%"
                                    filterUnits="objectBoundingBox" id="messageAppendix">
                                <feoffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
                                <fegaussianblur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                                <fecolormatrix
                                    values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
                                    in="shadowBlurOuter1"
                                />
                            </filter>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <path
                                d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
                                fill="#000"
                                filter="url(#messageAppendix)"
                            />
                            <path
                                d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
                                  fill="FFF"
                                  className="corner"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default MessageElement;