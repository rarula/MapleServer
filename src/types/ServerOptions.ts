import { RconOptions } from 'rcon-client';

export type ServerOptions = {
    rconClient: RconOptions;
    server: {
        directoryPath: string;
    };
};
