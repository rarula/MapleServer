import { EventMapType, StrictEventEmitter } from 'strict-event-emitter';

export class EventEmitterWrapper<T extends EventMapType> {
    private readonly emitter = new StrictEventEmitter<T>();

    public on<U extends keyof T>(event: U, listener: T[U]): this {
        this.emitter.on(event, listener);
        return this;
    }

    public once<U extends keyof T>(event: U, listener: T[U]): this {
        this.emitter.once(event, listener);
        return this;
    }

    public off<U extends keyof T>(event: U, listener: T[U]): this {
        this.emitter.off(event, listener);
        return this;
    }

    public removeListener<U extends keyof T>(event: U, listener: T[U]): this {
        this.emitter.removeListener(event, listener);
        return this;
    }

    public removeAllListeners<U extends keyof T>(event?: U): this {
        this.emitter.removeAllListeners(event);
        return this;
    }

    protected emit<U extends keyof T>(event: U, ...args: Parameters<T[U]>): boolean {
        return this.emitter.emit(event, ...args);
    }
}
