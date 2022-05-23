import { ChildProcess, spawn } from 'child_process';
import { convert } from 'encoding-japanese';
import EventEmitter from 'events';
import { readFileSync } from 'fs';
import path from 'path';
import properties from 'properties';
import { Rcon, RconOptions } from 'rcon-client';
import TypedEmitter from 'typed-emitter';

import { emit, parseLog } from '../EventManager';
import { Properties } from '../types/Properties';
import { ServerEvents } from '../types/ServerEvents';
import { MapleWorld } from '../world/MapleWorld';

export type ServerOptions = {
    rconClient: RconOptions;
    server: {
        directoryPath: string;
    };
};

export class MapleServer {
    private emitter = new EventEmitter() as TypedEmitter<ServerEvents>;
    on = this.emitter.on.bind(this.emitter);
    once = this.emitter.once.bind(this.emitter);
    off = this.emitter.off.bind(this.emitter);

    private process: ChildProcess | undefined;
    private world: MapleWorld | undefined;

    private rconClient: Rcon;
    private serverDirPath: string;
    private online = false;

    /**
     * @param options Options for MapleServer.
     */
    constructor(options: ServerOptions) {
        this.rconClient = new Rcon(options.rconClient);
        this.serverDirPath = options.server.directoryPath;

        this.on('ready', () => {
            this.online = true;
            this.world = new MapleWorld(this, this.rconClient, this.serverDirPath);
        });

        this.on('serverStop', () => {
            this.online = false;
            delete this.process;
        });
    }

    /**
     * Start MapleServer.
     * When the MapleServer is ready, the MapleWorld will be created.
     * @param args Command options and arguments to start the Minecraft server.
     */
    public start(args: string[]): void {
        if (this.process) {
            throw new Error('MapleServer is already running.');
        }
        this.process = spawn('java', args, {
            cwd: this.serverDirPath,
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.stdin.pipe(this.process.stdin!);
        this.process.stderr?.pipe(process.stderr);

        this.process.stdout?.on('data', (data: Buffer) => {
            const logs = convert(data, { to: 'UNICODE', type: 'string' });
            process.stdout.write(logs);

            parseLog(logs).forEach((log) => {
                emit(log, this, this.emitter, this.rconClient);
            });
        });
    }

    /**
     * Shutdown MapleServer.
     */
    public shutdown(): void {
        if (!this.process) {
            throw new Error('MapleServer is already stopped.');
        }
        this.process.stdin?.write('stop\n');
    }

    /**
     * Get whether the server is currently online.
     * @returns {boolean} `true` if the server is online, `false` otherwise.
     */
    public isOnline(): boolean {
        return this.online;
    }

    /**
     * Get properties from server.properties.
     * @returns {Properties}
     */
    public getProperties(): Properties {
        const content = readFileSync(path.join(this.serverDirPath, 'server.properties'), 'utf-8');
        return properties.parse(content) as Properties;
    }

    /**
     * Gets the MapleWorld on the server.
     * Returns `undefined` if the server is not ready.
     */
    public get mapleWorld(): MapleWorld | undefined {
        return this.world;
    }
}
