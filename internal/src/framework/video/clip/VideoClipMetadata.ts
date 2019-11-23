/**
 * Object contains initial video clip information
 */
interface VideoClipMetadata {
    /** Path to original resource */
    url: string,
    /** Timecode values (in seconds) array */
    frames: number[],
    /** Whole playback duration (in seconds) */
    duration: number,
}