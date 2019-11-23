/**
 * Video clip helper class.
 * Used to convert timecode values to frame values and vice versa
 */
class VideoFrameEvaluator {
    private _frames: number [];
    private _framesCount: number;
    private _fps: number;

    private _eps: number = 1e-4;
    private _ranges: RangesHelper;

    /**
     * Creates evaluator instanse
     * @param frames Timecode values (in seconds) array
     * @param duration Whole playback duration (in seconds)
     */
    constructor(frames: number[], duration: number) {
        this._frames = frames;
        this._framesCount = frames.length;
        this._fps = this._frames.length / duration;

        frames.push(duration);

        this._ranges = new RangesHelper();
    }

    /** Framerate. Average number of frames per second */
    get fps(): number {
        return this._fps;
    }

    /** Total frames count value. Read-only */
    get framesCount(): number {
        return this._framesCount;
    }

    /**
     * Converts specified timecode value (in seconds) to the corresponding frame value
     * @param sec Timecode value
     */
    toFrame(sec: number): number {
        sec = this.fitTime(sec);
        let frame = this.approximateFrame(sec);

        while (!this._ranges.withinRange(this._frames[frame], sec, this._frames[frame + 1])) {
            frame = this._ranges.makeCorrection(frame);
        }

        return frame;
    }

    /**
     * Converts specified frame value to the corresponding timecode value (in seconds)
     * @param frame Frame value
     */
    toTimecode(frame: number): number {
        frame = this.fitFrame(frame);
        return this._frames[frame] + this._eps;
    }

    private approximateFrame(time: number): number {
        return Math.round(time * this._fps);
    }

    private fitFrame(frame: number): number {
        if (frame < 0) {
            return 0;
        }

        const lastFrame = this._framesCount - 1;
        if (frame > lastFrame) {
            return lastFrame;
        }

        return frame << 0;
    }

    private fitTime(sec: number): number {
        if (sec < 0) {
            return 0;
        }

        const lastFrameTime = this._frames[this._framesCount - 1];
        if (sec > lastFrameTime) {
            return lastFrameTime;
        }

        return sec;
    }
}

/**
 * VideoFrameEvaluator helper class.
 * Used to refine and correct the approximation of frames
 */
class RangesHelper {
    /**
     * Returns flag whether specified value within specified range [left, right)
     * @param left Left limit value
     * @param value Estimated value
     * @param right Right limit value
     */
    withinRange(left: number, value: number, right: number) {
        if (value < left) {
            this.makeCorrection = this.dec;
            return false;
        } else if (value >= right) {
            this.makeCorrection = this.inc;
            return false;
        }

        return true;
    }

    /** 
     * Performs the necessary correction after within range check
     * @param value Value to correct
     */
    makeCorrection(value: number): number { return value; }

    private inc(value: number): number {
        return value + 1;
    }

    private dec(value: number): number {
        return value - 1;
    }
}

export default VideoFrameEvaluator;