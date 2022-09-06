import { ILogRegex } from '../../types/LogRegex';

export const LogRegex: ILogRegex = {
    CONTENT: /^\[\d{2}:\d{2}:\d{2}] \[[^\]]+]: (.+)/,

    RCON_CHAT: /^<Rcon> (.+)$/,

    SERVER_CHAT: /^<Server> (.+)$/,

    PLAYER_CHAT: /^<(.+)> (.+)$/,

    PLAYER_LOGIN: /^UUID of player (.+) is (.+)$/,

    PLAYER_JOIN: /^(.+) joined the game$/,

    PLAYER_QUIT: /^(.+) left the game$/,

    SERVER_START: /^Starting minecraft server version .+$/,

    SERVER_STOP: /^Stopping server$/,

    READY: /^Thread RCON Listener started$/,
};
