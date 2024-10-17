import MessageInput from "./message-input.jsx";
import AttachmentMenu from "./attachmentmenu/attachment-menu.jsx";
import "./input.css"

const MessageInputWrapper = () => {
    return (
        <div className="composer-wrapper">
            <div className="message-input-wrapper peer-color-2">
                <button type="button"
                        className="Button symbol-menu-button default translucent round"
                        aria-label="Choose emoji, sticker or GIF"
                        title="Choose emoji, sticker or GIF">
                    <div className="symbol-menu-trigger"/>
                    <i className="icon icon-smile"/>
                </button>
                <MessageInput/>
                <AttachmentMenu/>
            </div>
        </div>
    );
}

export default MessageInputWrapper;