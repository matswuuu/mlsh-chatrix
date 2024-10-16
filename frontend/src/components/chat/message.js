class Message {

    constructor(id, content, author, timestamp) {
        this.id = id;
        this.content = content
        this.author = author
        this.timestamp = timestamp
    }

    getFormatedDate() {
        const date = new Date();
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }).format(date);
    }

}

export default Message;