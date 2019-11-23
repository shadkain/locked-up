import VideoFrameEvaluator from './VideoFrameEvaluator';

class VideoClip {
    private _element: HTMLVideoElement;
    private _frames: VideoFrameEvaluator;

    /**
     * Creates video clip instance
     * @param metadata Video clip metadata
     */
    constructor(metadata: VideoClipMetadata) {
        this._frames = new VideoFrameEvaluator(
            metadata.frames,
            metadata.duration
        );

        this._element = document.createElement('video');
        this._element.src = metadata.url;
    }

    /** HTML video element. Read-only */
    get element(): HTMLVideoElement {
        return this._element;
    }

    /** Current playback frame. Read-write */
    get frame(): number {
        return this._frames.toFrame(this._element.currentTime);
    }

    set frame(value: number) {
        this._element.currentTime = this._frames.toTimecode(value);
    }

    /** Total frames count value. Read-only */
    get framesCount(): number {
        return this._frames.framesCount;
    }

    /**
     * Starts playback
     */
    play() {
        this._element.play();
    }

    /**
     * Stops playback
     */
    pause() {
        this._element.pause();
    }
}

export default VideoClip;