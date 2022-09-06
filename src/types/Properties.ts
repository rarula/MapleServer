export type Difficulty =
    | 0
    | 1
    | 2
    | 3
    | 'peaceful'
    | 'easy'
    | 'normal'
    | 'hard';

export type Gamemode =
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
        | undefined;
    'allow-nether':
        | boolean
        | undefined;
    'broadcast-console-to-ops':
        | boolean
        | undefined;
    'broadcast-rcon-to-ops':
        | boolean
        | undefined;
    'difficulty':
        | Difficulty
        | undefined;
    'enable-command-block':
        | boolean
        | undefined;
    'enable-jmx-monitoring':
        | boolean
        | undefined;
    'enable-rcon':
        | boolean
        | undefined;
    'sync-chunk-writes':
        | boolean
        | undefined;
    'enable-status':
        | boolean
        | undefined;
    'enable-query':
        | boolean
        | undefined;
    'enforce-secure-profile':
        | boolean
        | undefined;
    'enforce-whitelist':
        | boolean
        | undefined;
    'entity-broadcast-range-percentage':
        | number
        | undefined;
    'force-gamemode':
        | boolean
        | undefined;
    'function-permission-level':
        | 1
        | 2
        | 3
        | 4
        | undefined;
    'gamemode':
        | Gamemode
        | undefined;
    'generate-structures':
        | boolean
        | undefined;
    'generator-settings':
        | object
        | undefined;
    'hardcore':
        | boolean
        | undefined;
    'level-name':
        | string
        | undefined;
    'level-seed':
        | string
        | undefined;
    'level-type':
        | string
        | undefined;
    'max-chained-neighbor-updates':
        | number
        | undefined;
    'max-players':
        | number
        | undefined;
    'max-tick-time':
        | number
        | undefined;
    'max-world-size':
        | number
        | undefined;
    'motd':
        | string
        | undefined;
    'network-compression-threshold':
        | number
        | undefined;
    'online-mode':
        | boolean
        | undefined;
    'op-permission-level':
        | 0
        | 1
        | 2
        | 3
        | 4
        | undefined;
    'player-idle-timeout':
        | number
        | undefined;
    'prevent-proxy-connections':
        | boolean
        | undefined;
    'previews-chat':
        | boolean
        | undefined;
    'pvp':
        | boolean
        | undefined;
    'query.port':
        | number
        | undefined;
    'rate-limit':
        | number
        | undefined;
    'rcon.password':
        | string
        | undefined;
    'rcon.port':
        | number
        | undefined;
    'resource-pack':
        | string
        | undefined;
    'resource-pack-prompt':
        | string
        | undefined;
    'resource-pack-sha1':
        | string
        | undefined;
    'require-resource-pack':
        | boolean
        | undefined;
    'server-ip':
        | string
        | undefined;
    'server-port':
        | number
        | undefined;
    'simulation-distance':
        | number
        | undefined;
    'snooper-enabled':
        | boolean
        | undefined;
    'spawn-animals':
        | boolean
        | undefined;
    'spawn-monsters':
        | boolean
        | undefined;
    'spawn-npcs':
        | boolean
        | undefined;
    'spawn-protection':
        | number
        | undefined;
    'text-filtering-config':
        | unknown
        | undefined;
    'use-native-transport':
        | boolean
        | undefined;
    'view-distance':
        | number
        | undefined;
    'white-list':
        | boolean
        | undefined;
}>;
