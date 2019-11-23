/**
 * Set alias for playback event.
 * Used to store events.
 */
type EventSet = Set<Function>;

/**
 * Manager for playback event.
 * Used internally.
 */
export class PlaybackEventManager {
    private _api: PlaybackEventAPI;
    private _eventSet: EventSet;

    /**
     * Creates instance of playback event manager.
     */
    constructor() {
        this._eventSet = new Set();
        this._api = new PlaybackEventAPI(this._eventSet);
    }

    /**
     * External API to manage events.
     */
    get api(): PlaybackEventAPI {
        return this._api;
    }

    /**
     * Emits all callbacks planned on chosen playback event. Deletes them from event set.
     * @param remove Flag whether to delete events after emit. Defaults to: true.
     */
    emit(remove: boolean = true) {
        this._eventSet.forEach(callback => callback());

        if (remove) {
            this._eventSet.clear();
        }
    }
}

/**
 * API to plan/cancel playback events.
 * Used externally.
 */
export class PlaybackEventAPI {
    private _eventSet: EventSet;

    /**
     * Creates instance of playback event API.
     * @param eventSet Event line from playback event manager
     */
    constructor(eventSet: EventSet) {
        this._eventSet = eventSet;
    }

    /**
     * Plans to emit specified callback on chosen playback event. Returns itself to allow chaining.
     * @param callback Callback to emit.
     */
    add(callback: Function): PlaybackEventAPI {
        this._eventSet.add(callback);

        console.log('playback event added');

        return this;
    }

    /**
     * Cancels planned emit specified callback on chosen playback event. Returns itself to allow chaining.
     * @param callback Callback was planned to emit. Leave empty to cancel all.
     */
    remove(callback?: Function): PlaybackEventAPI {
        if (arguments.length === 1) {
            this._eventSet.clear();
        }

        this._eventSet.delete(callback);

        console.log('playback event deleted');

        return this;
    }
}