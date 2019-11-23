/**
 * Map alias for frame reached event.
 * Used to store events.
 */
type EventLine = Map<number, Set<Function>>;

/**
 * Manager for frame reached event.
 * Used internally.
 */
export class FrameReachedManager {
    private _api: FrameReachedAPI;
    private _eventLine: EventLine;

    /**
     * Creates instance of frame reached event manager.
     */
    constructor() {
        this._eventLine = new Map();
        this._api = new FrameReachedAPI(this._eventLine);
    }

    /**
     * External API to manage events.
     */
    get api(): FrameReachedAPI {
        return this._api;
    }

    /**
     * Emits all callbacks planned on specified frame number. Deletes them from event line.
     * @param frame Observable frame number.
     * @param remove Flag whether to delete events after emit. Defaults to: true.
     */
    emit(frame: number, remove: boolean = true) {
        let events = this._eventLine.get(frame);
        if (!events) {
            return;
        }

        events.forEach(callback => callback());

        if (remove) {
            this._eventLine.delete(frame);
        }
    }
}

/**
 * API to plan/cancel frame reached events.
 * Used externally.
 */
export class FrameReachedAPI {
    private _eventLine: EventLine;

    /**
     * Creates instance of frame reached event API.
     * @param eventLine Event line from frame reached event manager.
     */
    constructor(eventLine: EventLine) {
        this._eventLine = eventLine;
    }

    /**
     * Plans to emit specified callback on reaching specified frame. Returns itself to allow chaining.
     * @param frame Observable frame number.
     * @param callback Callback to emit.
     */
    add(frame: number, callback: Function): FrameReachedAPI {
        let events = this._eventLine.get(frame);
        if (!events) {
            events = new Set();
            this._eventLine.set(frame, events);
        }
        events.add(callback);

        console.log(`frame-reached on ${frame} frame event planned`);

        return this;
    }

    /**
     * Cancels planned emit specified callback on reaching specified frame. Returns itself to allow chaining.
     * @param frame Observable frame number.
     * @param callback Callback was planned to emit. Leave empty to cancel all.
     */
    remove(frame: number, callback?: Function): FrameReachedAPI {
        if (arguments.length === 1) {
            this._eventLine.delete(frame);
            return this;
        }

        let events = this._eventLine.get(frame);
        if (!events) {
            return this;
        }
        events.delete(callback);
        if (!events.size) {
            this._eventLine.delete(frame);
        }

        console.log(`frame-reached on ${frame} frame event cancelled`);

        return this;
    }

    removeAll() {
        this._eventLine.clear();
    }
}