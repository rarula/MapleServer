import { MapleWorld } from './MapleWorld';

const REGEX_ONLINE = /^Test passed, count: \d+$/;

export class MaplePlayer {
    private world: MapleWorld;
    private originalName: string;

    constructor(world: MapleWorld, name: string) {
        this.world = world;
        this.originalName = name;
    }

    /**
     * Gets whether the player is currently online.
     * @returns {Promise<boolean>} `true` if the player is online, `false` otherwise.
     */
    public async isOnline(): Promise<boolean> {
        const response = await this.world.sendCommand(`execute if entity ${this.originalName}`);
        return REGEX_ONLINE.test(response);
    }

    /**
     * Make the player execute the command.
     * @param command Command to execute. Don't prefix commands with /.
     * @returns {Promise<string>} Response from the server.
     */
    public async sendCommand(command: string): Promise<string> {
        return await this.world.sendCommand(`execute as ${this.originalName} at @s run ${command}`);
    }

    /**
     * Gets the name of this player.
     */
    public get name(): string {
        return this.originalName;
    }

    /**
     * Gets the MapleWorld this player resides in.
     */
    public get mapleWorld(): MapleWorld {
        return this.world;
    }
}
