import { ChildProcess, spawn } from 'child_process';
import { convert } from 'encoding-japanese';
import { readFileSync } from 'fs';
import path from 'path';
import { parse } from 'properties';
import { Rcon, RconOptions } from 'rcon-client';

import { getLogRegex } from './flavors/logRegex';
import { MapleWorld } from './MapleWorld';
import { Events } from './types/Events';
import { Flavor } from './types/Flavor';
import { ILogRegex } from './types/LogRegex';
import { Properties } from './types/Properties';
import { UUID } from './types/UUID';
import { Version } from './types/Version';
import { EventEmitterWrapper } from './utils/EventEmitterWrapper';

export interface MapleOptions {
    dirPath: string;
    version: Version;
    flavor: Flavor;
}

export interface MapleArgs {
    jvmArgs: string[];
    rconOptions: RconOptions;
}

export class MapleServer extends EventEmitterWrapper<Events> {
    private dirPath: string;
    private version: Version;
    private flavor: Flavor;
    private logRegex: ILogRegex | undefined;

    private _online = false;
    private _world: MapleWorld | undefined;

    private rcon: Rcon | undefined;
    private proc: ChildProcess | undefined;

    constructor(options: MapleOptions) {
        super();

        this.dirPath = options.dirPath;
        this.version = options.version;
        this.flavor = options.flavor;
    }

    public isOnline(): boolean {
        return this._online;
    }

    public get world(): MapleWorld | undefined {
        return this._world;
    }

    public getProperties(): Properties {
        const filePath = path.join(this.dirPath, 'server.properties');
        const file = readFileSync(filePath, 'utf-8');
        return parse(file) as Properties;
    }

    public async start(options: MapleArgs): Promise<void> {
        if (this.proc) throw Error('MapleServer is already running.');

        this.logRegex = await getLogRegex(this.flavor, this.version);
        this.rcon = new Rcon(options.rconOptions);
        this.proc = spawn('java', options.jvmArgs, {
            cwd: this.dirPath,
        });

        if (this.proc.stdin) process.stdin.pipe(this.proc.stdin);
        if (this.proc.stderr) this.proc.stderr.pipe(process.stderr);
        if (this.proc.stdout) this.proc.stdout.on('data', this.parseLog.bind(this));
    }

    private parseLog(data: Buffer): void {
        if (!this.logRegex) return;

        const unicode = convert(data, { to: 'UNICODE', type: 'string' });
        const lines = unicode.split('\n');

        process.stdout.write(unicode);

        for (const line of lines) {
            const log = line.match(this.logRegex.CONTENT);
            if (log) this.emitFromLog(log[1]);
        }
    }

    private async emitFromLog(log: string): Promise<void> {
        if (!this.logRegex) return;

        const regex = this.logRegex;
        const world = this._world;
        const online = this._online;

        // RCONのチャットを無視
        if (regex.RCON_CHAT.test(log)) return;

        // サーバーのチャットを無視
        if (regex.SERVER_CHAT.test(log)) return;

        // プレイヤーのチャット
        const playerChat = log.match(regex.PLAYER_CHAT);
        if (playerChat && world && online) {
            const senders = world.matchPlayers(playerChat[1]);
            const message = playerChat[2];

            this.emit('playerChat', senders, message);
            return;
        }

        // プレイヤーがログイン
        const playerLogin = log.match(regex.PLAYER_LOGIN);
        if (playerLogin && world && online) {
            const name = playerLogin[1];
            const uuid = playerLogin[2] as UUID;

            world.getOrCreatePlayer(name, uuid);
            return;
        }

        // プレイヤーが参加
        const playerJoin = log.match(regex.PLAYER_JOIN);
        if (playerJoin && world && online) {
            const players = world.matchPlayers(playerJoin[1]);

            this.emit('playerJoin', players);
            return;
        }

        // プレイヤーが退出
        const playerQuit = log.match(regex.PLAYER_QUIT);
        if (playerQuit && world && online) {
            const players = world.matchPlayers(playerQuit[1]);

            this.emit('playerQuit', players);
            return;
        }

        // サーバーが起動
        const serverStart = log.match(regex.SERVER_START);
        if (serverStart) {
            this.emit('serverStart');
            return;
        }

        // サーバーが停止
        const serverStop = log.match(regex.SERVER_STOP);
        if (serverStop) {
            this._online = false;

            this.emit('serverStop');
            return;
        }

        // サーバーの準備が整う
        const ready = log.match(regex.READY);
        if (ready && this.proc && this.rcon) {
            await this.rcon.connect();

            this._online = true;
            this._world = new MapleWorld(this.dirPath, this, this.proc, this.rcon);

            this.emit('ready');
            return;
        }
    }
}
