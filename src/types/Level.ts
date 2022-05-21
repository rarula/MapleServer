export type Level = Readonly<{
    Data: Data;
}>;

// Level.Data
type Data = Readonly<{
    allowCommands: boolean;
    BorderCenterX: number;
    BorderCenterZ: number;
    BorderDamagePerBlock: number;
    BorderSafeZone: number;
    BorderSize: number;
    BorderSizeLerpTarget: number;
    BorderSizeLerpTime: number;
    BorderWarningBlocks: number;
    BorderWarningTime: number;
    clearWeatherTime: number;
    CustomBossEvents: CustomBossEvents;
    DataPacks: DataPacks;
    DataVersion: number;
    DayTime: number;
    Difficulty: number;
    DifficultyLocked: boolean;
    DragonFight: DragonFight;
    GameRules: GameRules;
    GameType: number;
    hardcore: boolean;
    initialized: boolean;
    LastPlayed: number;
    LevelName: string;
    raining: boolean;
    rainTime: number;
    ScheduledEvents: ScheduledEvent[];
    ServerBrands: Readonly<string[]>;
    SpawnAngle: number;
    SpawnX: number;
    SpawnY: number;
    SpawnZ: number;
    thundering: boolean;
    thunderTime: number;
    Time: number;
    version: number;
    Version: Version;
    WanderingTraderId: Readonly<Int32Array>;
    WanderingTraderSpawnChance: number;
    WanderingTraderSpawnDelay: number;
    WasModded: boolean;
    WorldGenSettings: WorldGenSettings;
}>;

// Level.Data.CustomBossEvents
type CustomBossEvents = Readonly<{
    [bossbarId: string]: Readonly<{
        Color: string;
        CreateWorldFog: boolean;
        DarkenScreen: boolean;
        Max: number;
        Name: string;
        Overlay: string;
        PlayBossMusic: boolean;
        Players: Readonly<Int32Array[]>;
        Value: number;
        Visible: boolean;
    }>;
}>;

// Level.Data.DataPacks
type DataPacks = Readonly<{
    Disabled: Readonly<string[]>;
    Enabled: Readonly<string[]>;
}>;

// Level.Data.DragonFight
type DragonFight = Readonly<{
    Dragon: Readonly<Int32Array[]>;
    DragonKilled: boolean;
    ExitPortalLocation: Readonly<{
        X: number;
        Y: number;
        Z: number;
    }>;
    Gateways: Readonly<number[]>;
    NeedsStateScanning: boolean;
    PreviouslyKilled: boolean;
}>;

// Level.Data.GameRules
type GameRules = Readonly<{
    announceAdvancements: string;
    commandBlockOutput: string;
    disableElytraMovementCheck: string;
    disableRaids: string;
    doDaylightCycle: string;
    doEntityDrops: string;
    doFireTick: string;
    doImmediateRespawn: string;
    doInsomnia: string;
    doLimitedCrafting: string;
    doMobLoot: string;
    doMobSpawning: string;
    doPatrolSpawning: string;
    doTileDrops: string;
    doTraderSpawning: string;
    doWeatherCycle: string;
    drowningDamage: string;
    fallDamage: string;
    fireDamage: string;
    forgiveDeadPlayers: string;
    freezeDamage: string;
    keepInventory: string;
    logAdminCommands: string;
    maxCommandChainLength: string;
    maxEntityCramming: string;
    mobGriefing: string;
    naturalRegeneration: string;
    playersSleepingPercentage: string;
    randomTickSpeed: string;
    reducedDebugInfo: string;
    sendCommandFeedback: string;
    showDeathMessages: string;
    spawnRadius: string;
    spectatorsGenerateChunks: string;
    universalAnger: string;
}>;

// Level.Data.ScheduledEvent
type ScheduledEvent = Readonly<{
    Callback: Readonly<{
        Name: string;
        Type: string;
    }>;
    Name: string;
    TriggerTime: number;
}>;

// Level.Data.Version
type Version = Readonly<{
    Id: number;
    Name: string;
    Series: string;
    Snapshot: boolean;
}>;

// Level.Data.WorldGenSettings
type WorldGenSettings = Readonly<{
    bonus_chest: boolean;
    dimensions: Readonly<{
        [dimensionId: string]: Readonly<object>;
    }>;
    generate_features: boolean;
    seed: number;
}>;
