import { deserialize } from '@xmcl/nbt';
import { readFileSync } from 'fs';
import path from 'path';
import { Rcon } from 'rcon-client';

import { MaplePlayer } from '../player/MaplePlayer';
import { MapleServer } from '../server/MapleServer';
import { Level } from '../types/Level';

const REGEX_ONLINE_PLAYERS = /^There are \d+ of a max of \d+ players online: (.+)$/;

export class MapleWorld {
    private playerMap: Map<string, MaplePlayer> = new Map();
    private rconClient: Rcon;
    private worldDirPath = '';

    constructor(server: MapleServer, rconClient: Rcon, serverDirPath: string) {
        this.rconClient = rconClient;

        const levelName = server.getProperties()['level-name'];
        if (levelName) {
            this.worldDirPath = path.join(serverDirPath, levelName);
        }
    }

    /**
     * Get level from level.dat
     * @returns {Promise<Level>}
     */
    public async getLevel(): Promise<Level> {
        return await deserialize(readFileSync(path.join(this.worldDirPath, 'level.dat')));
    }

    /**
     * Gets a list of all currently logged in players.
     * @returns {Promise<MaplePlayer[][]>}
     */
    public async getOnlinePlayers(): Promise<MaplePlayer[][]> {
        const players: MaplePlayer[][] = [];
        const response = await this.sendCommand('list');
        const names = response.match(REGEX_ONLINE_PLAYERS);
        if (names) {
            names[1].split(', ').forEach((name) => {
                players.push(this.matchPlayer(name));
            });
        }
        return players;
    }

    /**
     * Creates a MaplePlayer with the specified name.
     * @param name Name of the player to create.
     * @returns {MaplePlayer}
     */
    public createPlayer(name: string): MaplePlayer {
        const player = new MaplePlayer(this, name);
        this.playerMap.set(name, player);
        return player;
    }

    /**
     * Returns a list of all players with names that may match the given display name.
     * @param name Partial name to match.
     * @returns {MaplePlayer[]} A list of all possible matches.
     */
    public matchPlayer(name: string): MaplePlayer[] {
        const players: MaplePlayer[] = [];
        const keys = this.playerMap.keys();
        for (const key of keys) {
            if (name.includes(key)) {
                players.push(this.playerMap.get(key) as MaplePlayer);
            }
        }
        return players;
    }

    /**
     * Send a command to the server.
     * The command is executed by Rcon, not by the server.
     * @param command Command to send to the server.
     * @returns {Promise<string>} Response from the server.
     */
    public async sendCommand(command: string): Promise<string> {
        return await this.rconClient.send(`${command}`);
    }
}
