import IEventBus, { Handler } from './IEventBus';

type Channel = Set<Handler>;

/** Publisher-subscriber event service. */
export default class EventBus<K>
implements IEventBus<K> {
    private _channels: Map<K, Channel>;

    /**
     * Creates event bus instance.
     */
    constructor() {
        this._channels = new Map();
    }

    /**
     * Subscribes on specified channel. If channel doesn't exist, creates it.
     * @param channelName Name of channel to subscribe.
     * @param handler Publish handler.
     */
    subscribe(channelName: K, handler: Handler) {
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
    unsubscribe(channelName: K, handler: Handler): boolean {
        let channel = this._channels.get(channelName);
        if (!channel) return;

        const flag = channel.delete(handler);

        if (!channel.size) {
            this.dropChannel(channelName);
        }

        return flag;
    }

    /**
     * Drops specified channel. Returns deletion success flag.
     * @param channelName Name of channel to drop.
     */
    dropChannel(channelName: K): boolean {
        return this._channels.delete(channelName);
    }

    /**
     * Calls all handlers subscribed on specified channel.
     * @param channelName Name of channel to publish to.
     * @param data Data to pass into each handler.
     */
    publish(channelName: K, data: {}) {
        const channel = this._channels.get(channelName);

        channel.forEach(handler => handler(data));
    }
}