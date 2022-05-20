type Difficulty =
    | 0
    | 1
    | 2
    | 3
    | 'peaceful'
    | 'easy'
    | 'normal'
    | 'hard';

type Gamemode =
    | 0
    | 1
    | 2
    | 3
    | 'survival'
    | 'creative'
    | 'adventure'
    | 'spectator';

export type Properties = Readonly<{
    'allow-flight':
        | boolean
        | null
        | undefined;
    'allow-nether':
        | boolean
        | null
        | undefined;
    'broadcast-console-to-ops':
        | boolean
        | null
        | undefined;
    'broadcast-rcon-to-ops':
        | boolean
        | null
        | undefined;
    'difficulty':
        | Difficulty
        | null
        | undefined;
    'enable-command-block':
        | boolean
        | null
        | undefined;
    'enable-jmx-monitoring':
        | boolean
        | null
        | undefined;
    'enable-rcon':
        | boolean
        | null
        | undefined;
    'sync-chunk-writes':
        | boolean
        | null
        | undefined;
    'enable-status':
        | boolean
        | null
        | undefined;
    'enable-query':
        | boolean
        | null
        | undefined;
    'entity-broadcast-range-percentage':
        | number
        | null
        | undefined;
    'force-gamemode':
        | boolean
        | null
        | undefined;
    'function-permission-level':
        | 1
        | 2
        | 3
        | 4
        | null
        | undefined;
    'gamemode':
        | Gamemode
        | null
        | undefined;
    'generate-structures':
        | boolean
        | null
        | undefined;
    'generator-settings':
        | object
        | null
        | undefined;
    'hardcore':
        | boolean
        | null
        | undefined;
    'level-name':
        | string
        | null
        | undefined;
    'level-seed':
        | string
        | null
        | undefined;
    'level-type':
        | string
        | null
        | undefined;
    'max-chained-neighbor-updates':
        | number
        | null
        | undefined;
    'max-players':
        | number
        | null
        | undefined;
    'max-tick-time':
        | number
        | null
        | undefined;
    'max-world-size':
        | number
        | null
        | undefined;
    'motd':
        | string
        | null
        | undefined;
    'network-compression-threshold':
        | number
        | null
        | undefined;
    'online-mode':
        | boolean
        | null
        | undefined;
    'op-permission-level':
        | 0
        | 1
        | 2
        | 3
        | 4
        | null
        | undefined;
    'player-idle-timeout':
        | number
        | null
        | undefined;
    'prevent-proxy-connections':
        | boolean
        | null
        | undefined;
    'pvp':
        | boolean
        | null
        | undefined;
    'query.port':
        | number
        | null
        | undefined;
    'rate-limit':
        | number
        | null
        | undefined;
    'rcon.password':
        | string
        | null
        | undefined;
    'rcon.port':
        | number
        | null
        | undefined;
    'resource-pack':
        | string
        | null
        | undefined;
    'resource-pack-prompt':
        | string
        | null
        | undefined;
    'resource-pack-sha1':
        | string
        | null
        | undefined;
    'require-resource-pack':
        | boolean
        | null
        | undefined;
    'server-ip':
        | string
        | null
        | undefined;
    'server-port':
        | number
        | null
        | undefined;
    'simulation-distance':
        | number
        | null
        | undefined;
    'snooper-enabled':
        | boolean
        | null
        | undefined;
    'spawn-animals':
        | boolean
        | null
        | undefined;
    'spawn-monsters':
        | boolean
        | null
        | undefined;
    'spawn-npcs':
        | boolean
        | null
        | undefined;
    'spawn-protection':
        | number
        | null
        | undefined;
    'text-filtering-config':
        | unknown
        | null
        | undefined;
    'use-native-transport':
        | boolean
        | null
        | undefined;
    'view-distance':
        | number
        | null
        | undefined;
    'white-list':
        | boolean
        | null
        | undefined;
    'enforce-whitelist':
        | boolean
        | null
        | undefined;
}>;
