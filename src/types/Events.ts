import { MaplePlayer } from '../MaplePlayer';

export interface Events {
    playerChat: (senders: MaplePlayer[], message: string) => void;
    playerQuit: (players: MaplePlayer[]) => void;
    playerJoin: (players: MaplePlayer[]) => void;
    serverStop: () => void;
    serverStart: () => void;
    ready: () => void;
}
