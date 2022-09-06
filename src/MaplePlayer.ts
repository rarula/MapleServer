import { MapleWorld } from './MapleWorld';
import { UUID } from './types/UUID';

export class MaplePlayer {
    constructor(
        private _world: MapleWorld,
        private _name: string,
        private _uuid: UUID,
    ) {}

    public get world(): MapleWorld {
        return this._world;
    }

    public get name(): string {
        return this._name;
    }

    public get uuid(): UUID {
        return this._uuid;
    }

    public async send(command: string): Promise<string> {
        return this._world.send(`execute as ${this._name} at @s run ${command}`);
    }

    public sendRaw(command: string): void {
        this._world.sendRaw(`execute as ${this._name} at @s run ${command}`);
    }
}
