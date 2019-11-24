import { IEventBus, EventBus } from '../event-bus/export';

export default class Application {
    private _eventBus = new EventBus<number>();

    get eventBus(): IEventBus<number> {
        return this._eventBus;
    }
}