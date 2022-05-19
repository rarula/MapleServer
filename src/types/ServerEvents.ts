import { MaplePlayer } from '../MaplePlayer';

export type ServerEvents = {
    playerChat: (player: MaplePlayer, message: string) => void;
    playerQuit: (player: MaplePlayer) => void;
    playerJoin: (player: MaplePlayer) => void;
    serverStop: () => void;
    serverStart: () => void;
    ready: () => void;
};
