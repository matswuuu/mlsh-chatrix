class Chat {

    constructor(chat) {
        this.name = chat.name;
        this.members = chat.members;
        this.image = chat.image;
        this.messages = chat.messages;
    }

    getPreviewMessage() {
        return this.messages.length > 0 ? this.messages[0] : "";
    }

}

export default Chat;