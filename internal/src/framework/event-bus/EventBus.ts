type Identifier = string;
type Handler = (data: {}) => void;
type Channel = Set<Handler>;

export default class EventBus {
    private _channels: Map<string, Channel>;

    constructor() {
        this._channels = new Map();
    }

    /**
     * Subscribes on specified channel. If channel doesn't exist, creates it.
     * @param channelName Name of channel to subscribe.
     * @param handler Publish handler.
     */
    subscribe(channelName: Identifier, handler: Handler) {
        let channel = this._channels.get(channelName);
        if (!channel) {
            channel = new Set();
            this._channels.set(channelName, channel);
        }

        channel.add(handler);
    }

    /**
     * Unsubscribes from specified channel. Returns unsubscription success flag.
     * @param channelName Name of channel to unsubscribe.
     * @param handler Publish handler.
     */
    unsubscribe(channelName: Identifier, handler: Handler): boolean {
        let channel = this._channels.get(channelName);
        if (!channel) return;

        return channel.delete(handler);
    }

    /**
     * Drops specified channel. Returns deletion success flag.
     * @param channelName Name of channel to drop.
     */
    dropChannel(channelName: Identifier): boolean {
        return this._channels.delete(channelName);
    }

    /**
     * Calls all handlers subscribed on specified channel.
     * @param channelName Name of channel to publish to.
     * @param data Data to pass into each handler.
     */
    publish(channelName: Identifier, data: {}) {
        const channel = this._channels.get(channelName);

        channel.forEach(handler => handler(data));
    }
}