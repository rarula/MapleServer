import { convert } from 'encoding-japanese';
import EventEmitter from 'events';
import { Rcon } from 'rcon-client';

import { MaplePlayer } from './MaplePlayer';
import { MapleServer } from './MapleServer';

const REGEX_CONTENT = /^\[\d{2}:\d{2}:\d{2}] \[[^\]]+]: (.+)/;

const REGEX_PLAYER_CHAT = /^<([^>]+)> (.+)$/;

const REGEX_PLAYER_QUIT = /^(.+) left the game$/;

const REGEX_PLAYER_JOIN = /^(.+) joined the game$/;

const REGEX_SERVER_STOP = /^Stopping server$/;

const REGEX_SERVER_START = /^Starting minecraft server version .+$/;

const REGEX_READY = /^Done \([^)]+\)! For help, type "help"$/;

export function parse(logs: Buffer, server: MapleServer, emitter: EventEmitter, rconClient: Rcon): void {
    const lines = convert(logs, {
        to: 'UNICODE',
        type: 'string',
    }).split('\n');

    lines.forEach(async (line) => {
        if (line) {
            process.stdout.write(line);
        }
        const contents = line.match(REGEX_CONTENT);
        if (contents) {
            const content = contents[1];

            // プレイヤーのチャット
            const playerChat = content.match(REGEX_PLAYER_CHAT);
            if (playerChat) {
                const world = server.mapleWorld;
                if (world) {
                    emitter.emit('playerChat', new MaplePlayer(world, playerChat[1]), playerChat[2]);
                }
                return;
            }

            // プレイヤーが退出
            const playerQuit = content.match(REGEX_PLAYER_QUIT);
            if (playerQuit) {
                const world = server.mapleWorld;
                if (world) {
                    emitter.emit('playerQuit', new MaplePlayer(world, playerQuit[1]));
                }
                return;
            }

            // プレイヤーが参加
            const playerJoin = content.match(REGEX_PLAYER_JOIN);
            if (playerJoin) {
                const world = server.mapleWorld;
                if (world) {
                    emitter.emit('playerJoin', new MaplePlayer(world, playerJoin[1]));
                }
                return;
            }

            // サーバーが停止
            const serverStop = content.match(REGEX_SERVER_STOP);
            if (serverStop) {
                emitter.emit('serverStop');
                return;
            }

            // サーバーが起動
            const serverStart = content.match(REGEX_SERVER_START);
            if (serverStart) {
                emitter.emit('serverStart');
                return;
            }

            // サーバーの準備が整う
            const ready = content.match(REGEX_READY);
            if (ready) {
                await rconClient.connect();
                emitter.emit('ready');
                return;
            }
        }
    });
}
