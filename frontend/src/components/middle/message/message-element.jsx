import React, {Component} from "react";

export default class MessageElement extends Component {

    constructor(props) {
        super(props);
        this.message = props.message;
    }

    getChatId() {
        return this.message.chatId;
    }

    getFormatedDate(timestamp) {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }).format(date);
    }

    render() {
        return (
            <div className="Message message-list-item allow-selection last-in-group last-in-list shown open">
                <div className="bottom-еmarker"
                     data-should-update-views="false"
                />
                <div className="message-select-control"/>
                <div className="Avatar size-small peer-color-4 interactive" data-peer-id="623689175">
                    <div className="inner">
                        {/* todo: set image by const url*/}
                        {/*<img src={message.author.image}*/}
                        {/*    className="Avatar__media avatar-media opacity-transition slow open shown"*/}
                        {/*    alt="" decoding="async" draggable="false"*/}
                        {/*/>*/}
                    </div>
                </div>
                <div className="message-content-wrapper can-select-text">
                    <div className="message-content peer-color-4 text has-shadow has-solid-background has-appendix has-footer"
                         dir="auto">
                        <div className="content-inner" dir="auto">
                            <div className="text-content clearfix with-meta" dir="auto">
                                {this.message.content}
                                <span className="MessageMeta" dir="ltr" data-ignore-on-paste="true">
                                <span className="message-time">{this.getFormatedDate(this.message.timestamp)}</span>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
