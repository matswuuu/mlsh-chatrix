class Chat {

    constructor(name, members, image, messages) {
        this.name = name;
        this.members = members;
        this.image = image;
        this.messages = messages;
    }

    getPreviewMessage() {
        return this.messages.length > 0 ? this.messages[0] : "";
    }

}

export default Chat;