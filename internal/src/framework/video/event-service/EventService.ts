import * as evt from './events';

/**
 * Video event service.
 * Used to manage video events via event APIs.
 */
export class EventService {
    private _frameReached: evt.FrameReachedManager;
    private _playbackStarted: evt.PlaybackEventManager;
    private _playbackEnded: evt.PlaybackEventManager;

    /**
     * Frame reached event API.
     * Event occurs on reaching specified observable frame number.
     */
    get frameReached(): evt.FrameReachedAPI {
        if (!this._frameReached) {
            this._frameReached = new evt.FrameReachedManager();
        }

        return this._frameReached.api;
    }

    /**
     * Playback started event API.
     * Event occurs on starting playback.
     */
    get playbackStarted(): evt.PlaybackEventAPI {
        if (!this._playbackStarted) {
            this._playbackStarted = new evt.PlaybackEventManager();
        }

        return this._playbackStarted.api;
    }

    /**
     * Playback ended event API.
     * Event occurs on reaching playback end.
     */
    get playbackEnded(): evt.PlaybackEventAPI {
        if (!this._playbackEnded) {
            this._playbackEnded = new evt.PlaybackEventManager();
        }

        return this._playbackEnded.api;
    }
}