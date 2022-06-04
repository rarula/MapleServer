import EventEmitter from 'events';
import { Rcon } from 'rcon-client';

import { MapleServer } from './server/MapleServer';

const REGEX_CONTENT = /^\[\d{2}:\d{2}:\d{2}] \[[^\]]+]: (.+)/;

const REGEX_PLAYER_CHAT = /^<(.+)> (.+)$/;

const REGEX_PLAYER_QUIT = /^(.+) left the game$/;

const REGEX_PLAYER_LOGIN = /^(.+)\[[^\]]+] logged in with entity id \d+ at \(.+\)$/;

const REGEX_PLAYER_JOIN = /^(.+) joined the game$/;

const REGEX_SERVER_STOP = /^Stopping server$/;

const REGEX_SERVER_START = /^Starting minecraft server version .+$/;

const REGEX_READY = /^Thread RCON Listener started$/;

export function parseLog(logs: string): string[] {
    return logs
        .split('\n')
        .map((line) => {
            const log = line.match(REGEX_CONTENT);
            if (!log) return;
            return log[1];
        })
        .filter((line): line is string => {
            return Boolean(line);
        });
}

export async function emit(log: string, server: MapleServer, emitter: EventEmitter, rconClient: Rcon): Promise<void> {
    const world = server.mapleWorld;

    // プレイヤーのチャット
    const playerChat = log.match(REGEX_PLAYER_CHAT);
    if (playerChat && world) {
        emitter.emit('playerChat', world.matchPlayer(playerChat[1]), playerChat[2]);
        return;
    }

    // プレイヤーが退出
    const playerQuit = log.match(REGEX_PLAYER_QUIT);
    if (playerQuit && world) {
        emitter.emit('playerQuit', world.matchPlayer(playerQuit[1]));
        return;
    }

    // プレイヤーがログイン
    const playerLogin = log.match(REGEX_PLAYER_LOGIN);
    if (playerLogin && world) {
        world.createPlayer(playerLogin[1]);
        return;
    }

    // プレイヤーが参加
    const playerJoin = log.match(REGEX_PLAYER_JOIN);
    if (playerJoin && world) {
        emitter.emit('playerJoin', world.matchPlayer(playerJoin[1]));
        return;
    }

    // サーバーが停止
    const serverStop = log.match(REGEX_SERVER_STOP);
    if (serverStop) {
        emitter.emit('serverStop');
        return;
    }

    // サーバーが起動
    const serverStart = log.match(REGEX_SERVER_START);
    if (serverStart) {
        emitter.emit('serverStart');
        return;
    }

    // サーバーの準備が整う
    const ready = log.match(REGEX_READY);
    if (ready) {
        await rconClient.connect();
        emitter.emit('ready');
        return;
    }
}
