import { deserialize } from '@xmcl/nbt';
import { ChildProcess } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import { Rcon } from 'rcon-client';

import { MaplePlayer } from './MaplePlayer';
import { MapleServer } from './MapleServer';
import { Level } from './types/Level';
import { UUID } from './types/UUID';

export class MapleWorld {
    private playerMap: Map<UUID, MaplePlayer> = new Map();
    private dirPath: string;

    constructor(
        private server: MapleServer,
        dirPath: string,
        private proc: ChildProcess,
        private rcon: Rcon,
    ) {
        const level = server.getProperties()['level-name'];
        this.dirPath = level
            ? path.join(dirPath, level)
            : '';
    }

    public async getLevel(): Promise<Level> {
        const filePath = path.join(this.dirPath, 'level.dat');
        const file = readFileSync(filePath);
        return await deserialize(file);
    }

    public stop(): void {
        if (!this.proc) throw Error('MapleServer is already stopped.');

        this.sendRaw('stop');
    }

    public getPlayer(uuid: UUID): MaplePlayer | undefined {
        return this.playerMap.get(uuid);
    }

    public getOrCreatePlayer(name: string, uuid: UUID): MaplePlayer {
        const player = this.getPlayer(uuid);
        if (player) {
            return player;
        } else {
            const player = new MaplePlayer(this, name, uuid);
            this.playerMap.set(uuid, player);
            return player;
        }
    }

    public matchPlayers(name: string): MaplePlayer[] {
        const players: MaplePlayer[] = [];
        const values = this.playerMap.values();

        for (const player of values) {
            if (name.includes(player.name)) {
                players.push(player);
            }
        }
        return players;
    }

    public async send(command: string): Promise<string> {
        return await this.rcon.send(command);
    }

    public sendRaw(command: string): void {
        if (this.proc.stdin) this.proc.stdin.write(command + '\n');
    }
}
