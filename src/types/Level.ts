export interface Level {
    readonly Data: {
        readonly allowCommands: boolean;
        readonly BorderCenterX: number;
        readonly BorderCenterZ: number;
        readonly BorderDamagePerBlock: number;
        readonly BorderSafeZone: number;
        readonly BorderSize: number;
        readonly BorderSizeLerpTarget: number;
        readonly BorderSizeLerpTime: number;
        readonly BorderWarningBlocks: number;
        readonly BorderWarningTime: number;
        readonly clearWeatherTime: number;
        readonly CustomBossEvents: {
            readonly [bossbarId: string]: {
                readonly Color: string;
                readonly CreateWorldFog: boolean;
                readonly DarkenScreen: boolean;
                readonly Max: number;
                readonly Name: string;
                readonly Overlay: string;
                readonly PlayBossMusic: boolean;
                readonly Players: Int32Array[];
                readonly Value: number;
                readonly Visible: boolean;
            };
        };
        readonly DataPacks: {
            readonly Disabled: string[];
            readonly Enabled: string[];
        };
        readonly DataVersion: number;
        readonly DayTime: number;
        readonly Difficulty: number;
        readonly DifficultyLocked: boolean;
        readonly DragonFight: {
            readonly Dragon: Int32Array;
            readonly DragonKilled: boolean;
            readonly ExitPortalLocation: {
                readonly X: number;
                readonly Y: number;
                readonly Z: number;
            };
            readonly Gateways: number[];
            readonly NeedsStateScanning: boolean;
            readonly PreviouslyKilled: boolean;
        };
        readonly GameRules: {
            readonly announceAdvancements: string;
            readonly commandBlockOutput: string;
            readonly disableElytraMovementCheck: string;
            readonly disableRaids: string;
            readonly doDaylightCycle: string;
            readonly doEntityDrops: string;
            readonly doFireTick: string;
            readonly doImmediateRespawn: string;
            readonly doInsomnia: string;
            readonly doLimitedCrafting: string;
            readonly doMobLoot: string;
            readonly doMobSpawning: string;
            readonly doPatrolSpawning: string;
            readonly doTileDrops: string;
            readonly doTraderSpawning: string;
            readonly doWeatherCycle: string;
            readonly drowningDamage: string;
            readonly fallDamage: string;
            readonly fireDamage: string;
            readonly forgiveDeadPlayers: string;
            readonly freezeDamage: string;
            readonly keepInventory: string;
            readonly logAdminCommands: string;
            readonly maxCommandChainLength: string;
            readonly maxEntityCramming: string;
            readonly mobGriefing: string;
            readonly naturalRegeneration: string;
            readonly playersSleepingPercentage: string;
            readonly randomTickSpeed: string;
            readonly reducedDebugInfo: string;
            readonly sendCommandFeedback: string;
            readonly showDeathMessages: string;
            readonly spawnRadius: string;
            readonly spectatorsGenerateChunks: string;
            readonly universalAnger: string;
        };
        readonly GameType: number;
        readonly hardcore: boolean;
        readonly initialized: boolean;
        readonly LastPlayed: number;
        readonly LevelName: string;
        readonly raining: boolean;
        readonly rainTime: number;
        readonly ScheduledEvents: ScheduledEvent[];
        readonly ServerBrands: string[];
        readonly SpawnAngle: number;
        readonly SpawnX: number;
        readonly SpawnY: number;
        readonly SpawnZ: number;
        readonly thundering: boolean;
        readonly thunderTime: number;
        readonly Time: number;
        readonly version: number;
        readonly Version: {
            readonly Id: number;
            readonly Name: string;
            readonly Series: string;
            readonly Snapshot: boolean;
        };
        readonly WanderingTraderId: Int32Array;
        readonly WanderingTraderSpawnChance: number;
        readonly WanderingTraderSpawnDelay: number;
        readonly WasModded: boolean;
        readonly WorldGenSettings: {
            readonly bonus_chest: boolean;
            readonly dimensions: {
                readonly [dimensionId: string]: object;
            };
            readonly generate_features: boolean;
            readonly seed: number;
        };
    };
}

interface ScheduledEvent {
    readonly Callback: {
        readonly Name: string;
        readonly Type: string;
    };
    readonly Name: string;
    readonly TriggerTime: number;
}
