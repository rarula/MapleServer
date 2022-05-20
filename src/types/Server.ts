import { RconOptions } from 'rcon-client';

import { MaplePlayer } from '../MaplePlayer';

export type ServerOptions = {
    rconClient: RconOptions;
    server: {
        directoryPath: string;
    };
};

export type ServerEvents = {
    // プレイヤーがチャットを送信した時に呼び出されるイベント
    playerChat: (player: MaplePlayer, message: string) => void;

    // プレイヤーがサーバーから退出した時に呼び出されるイベント
    playerQuit: (player: MaplePlayer) => void;

    // プレイヤーがサーバーに参加した時に呼び出されるイベント
    playerJoin: (player: MaplePlayer) => void;

    // サーバーが停止した時に呼び出されるイベント
    serverStop: () => void;

    // サーバーが起動した時に呼び出されるイベント
    serverStart: () => void;

    // サーバーの準備が完了した時に呼び出されるイベント
    ready: () => void;
};
