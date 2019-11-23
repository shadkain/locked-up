export default class SerialGenerator {
    private _i: number;

    /**
     * Creates serial generator instance.
     * @param initial First number in sequence.
     */
    constructor(initial: number = 0) {
        this._i = initial;
    }

    /**
     * Returns next number in the sequence.
     */
    get gen(): number {
        return this._i++;
    }
}