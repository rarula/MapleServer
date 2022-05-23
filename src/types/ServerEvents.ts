import { MaplePlayer } from '../player/MaplePlayer';

export type ServerEvents = {
    /**
     * Called when a player sends a chat.
     * @param sender The chat sender
     * @param message The message sent
     */
    playerChat: (sender: MaplePlayer, message: string) => void;

    /**
     * Called when a player leaves a server.
     * @param player Player who left the server
     */
    playerQuit: (player: MaplePlayer) => void;

    /**
     * Called when a player joins a server.
     * @param player Player who joined the server
     */
    playerJoin: (player: MaplePlayer) => void;

    /**
     * Called when a server is stopped.
     */
    serverStop: () => void;

    /**
     * Called when a server starts.
     */
    serverStart: () => void;

    /**
     * Called when a server is ready.
     */
    ready: () => void;
};
