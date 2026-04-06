class CommunityEventNotifier {
    handlers = [];

    constructor() {
        const protocol = window.location.protocol === 'http: ' ? 'ws' : 'wss';
        const host = window.location.host;
        this.socket = new WebSocket(`${protocol}://${host}/ws`);

        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.handlers.forEach((handler) => handler(event));
            } catch (err) {
                console.error('WebSocket message error:', err);
            }
        };
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }
}

const communityNotifier = new CommunityEventNotifier();
export { communityNotifier };