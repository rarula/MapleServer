export interface ILogRegex {
    readonly CONTENT: RegExp;

    readonly RCON_CHAT: RegExp;

    readonly SERVER_CHAT: RegExp;

    readonly PLAYER_CHAT: RegExp;

    readonly PLAYER_LOGIN: RegExp;

    readonly PLAYER_JOIN: RegExp;

    readonly PLAYER_QUIT: RegExp;

    readonly SERVER_START: RegExp;

    readonly SERVER_STOP: RegExp;

    readonly READY: RegExp;
}
