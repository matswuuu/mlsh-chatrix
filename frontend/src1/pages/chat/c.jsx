import React, {useState} from 'react';
import "./chat.css"

const MessageInput = ({onSendMessage}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        onSendMessage(inputValue);
        setInputValue(''); // clear input after sending
    };

    return (
        // <form className="message-input" onSubmit={handleSend}>
        //     <div className='input'>
        //         <input
        //             type="text"
        //             placeholder="Write a message..."
        //             value={inputValue}
        //             onChange={(e) => setInputValue(e.target.value)}
        //         />
        //     </div>
        //     <button type="submit">Send</button>
        // </form>
        <div className="message-input-wrapper peer-color-2">
            <button type="button" className="Button symbol-menu-button default translucent round"
                    aria-label="Choose emoji, sticker or GIF" title="Choose emoji, sticker or GIF">
                <div className="symbol-menu-trigger"></div>
                <i className="icon icon-smile"></i></button>
            <div className="Menu SymbolMenu">
                <div role="presentation"
                     className="bubble menu-container custom-scroll opacity-transition fast left bottom not-open not-shown"
                     // style={{transform-origin: "left bottom"}}>
                    >
                    <div className="SymbolMenu-main">
                        <div className="Transition">
                            <div className="EmojiPicker picker-tab Transition_slide Transition_slide-active">
                                <div className="EmojiPicker-header">
                                    <button type="button"
                                            className="Button symbol-set-button activated default translucent round faded"
                                            aria-label="Recently Used" title="Recently Used"><i
                                        className="icon icon-recent"></i></button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Smileys &amp; People" title="Smileys &amp; People"><i
                                        className="icon icon-smile"></i></button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Animals &amp; Nature" title="Animals &amp; Nature"><i
                                        className="icon icon-animals"></i></button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Food &amp; Drink" title="Food &amp; Drink"><i
                                        className="icon icon-eats"></i></button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Activities" title="Activities"><i
                                        className="icon icon-sport"></i>
                                    </button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Travel &amp; Places" title="Travel &amp; Places"><i
                                        className="icon icon-car"></i></button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Objects" title="Objects"><i className="icon icon-lamp"></i>
                                    </button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Symbols" title="Symbols"><i className="icon icon-language"></i>
                                    </button>
                                    <button type="button"
                                            className="Button symbol-set-button  default translucent round faded"
                                            aria-label="Flags" title="Flags"><i className="icon icon-flag"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SymbolMenu-footer">
                        <button type="button"
                                className="Button symbol-tab-button activated default translucent round faded"
                                aria-label="Emoji" title="Emoji"><i className="icon icon-smile"></i></button>
                        <button type="button" className="Button symbol-tab-button  default translucent round faded"
                                aria-label="Custom Emoji" title="Custom Emoji"><i className="icon icon-favorite"></i>
                        </button>
                        <button type="button" className="Button symbol-tab-button  default translucent round faded"
                                aria-label="Stickers" title="Stickers"><i className="icon icon-stickers"></i></button>
                        <button type="button" className="Button symbol-tab-button  default translucent round faded"
                                aria-label="GIFS" title="GIFS"><i className="icon icon-gifs"></i></button>
                        <button type="button" className="Button symbol-delete-button default translucent round faded"
                                aria-label="Remove Symbol" title="Remove Symbol"><i
                            className="icon icon-delete-left"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="message-input-text">
                <div className="custom-scroll input-scroller">
                    <div className="input-scroller-content">
                        <div id="editable-message-text" className="form-control allow-selection" contentEditable="true"
                             role="textbox" dir="auto" tabIndex="0" aria-label="Message"
                             // style="transition: color 50ms linear !important;">
                            >
                        </div>
                        <span className="placeholder-text" dir="auto">Message</span>
                        <canvas className="shared-canvas"></canvas>
                        <canvas className="shared-canvas"></canvas>
                        <div className="absolute-video-container"></div>
                    </div>
                </div>
                <div className="custom-scroll input-scroller clone">
                    <div className="input-scroller-content">
                        <div className="form-control allow-selection clone" dir="auto"></div>
                    </div>
                </div>
            </div>
            <div className="AttachMenu">
                <button id="attach-menu-button" type="button"
                        className="Button AttachMenu--button default translucent round" aria-label="Add an attachment"
                        aria-controls="attach-menu-controls" aria-haspopup="true" title="Add an attachment"><i
                    className="icon icon-attach" aria-hidden="true"></i></button>
                <div id="attach-menu-controls" className="Menu compact AttachMenu--menu fluid"
                     aria-labelledby="attach-menu-button" role="menu">
                    <div role="presentation"
                         className="bubble menu-container custom-scroll opacity-transition fast not-shown not-open">
                        <div role="menuitem" tabIndex="0" className="MenuItem compact"><i
                            className="icon icon-photo"></i>Photo
                            or Video
                        </div>
                        <div role="menuitem" tabIndex="0" className="MenuItem compact"><i
                            className="icon icon-document"></i>File
                        </div>
                        <div role="menuitem" tabIndex="0" className="MenuItem compact"><i
                            className="icon icon-poll"></i>Poll
                        </div>
                        <div role="menuitem" tabIndex="0" className="MenuItem compact"><i
                            className="mklnEg0s icon VGmPJoga"><img
                            alt="" className="tT8KQwg0 VGmPJoga" draggable="false"/></i>Wallet
                        </div>
                    </div>
                </div>
            </div>
            <div className="_8sFuAomM composer-tooltip custom-scroll-x not-open not-shown"></div>
            <div className="StickerTooltip composer-tooltip custom-scroll not-open not-shown hidden"></div>
            <div className="EmojiTooltip composer-tooltip custom-scroll-x not-open not-shown"></div>
        </div>
    );
};

export default MessageInput;