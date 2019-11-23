export type Handler = (data: {}) => void;

export default interface IEventBus<K> {
    /**
     * Subscribes on specified channel. If channel doesn't exist, creates it.
     * @param channelName Name of channel to subscribe.
     * @param handler Publish handler.
     */
    subscribe(channelName: K, handler: Handler): void;

     /**
     * Unsubscribes from specified channel. Returns unsubscription success flag.
     * @param channelName Name of channel to unsubscribe.
     * @param handler Publish handler.
     */
    unsubscribe(channelName: K, handler: Handler): boolean;

    /**
     * Drops specified channel. Returns deletion success flag.
     * @param channelName Name of channel to drop.
     */
    dropChannel(channelName: K, handler: Handler): boolean;

     /**
     * Calls all handlers subscribed on specified channel.
     * @param channelName Name of channel to publish to.
     * @param data Data to pass into each handler.
     */
    publish(channelName: K, data: {}): void;
}