const { MapleServer } = require('../lib');

const server = new MapleServer({
    rconClient: {
        port: 25575,
        host: 'localhost',
        password: 'password',
    },
    server: {
        directoryPath: 'path',
    },
});

server.start(['-Xmx2G', '-Xms2G', '-jar', 'server.jar']);

server.on('playerChat', async (sender, message) => {
    if (message === 'ping') {
        const text = [
            {
                text: ' -> ',
                color: 'gray',
            },
            {
                text: 'pong!',
                color: 'gold',
            },
        ];
        sender[0].sendCommand(`tellraw @s ${JSON.stringify(text)}`);
        return;
    }

    if (message === 'date') {
        const text = [
            {
                text: ' -> ',
                color: 'gray',
            },
            {
                text: `${new Date().toLocaleString('en-US')}`,
                color: 'gold',
            },
        ];
        sender[0].sendCommand(`tellraw @s ${JSON.stringify(text)}`);
        return;
    }

    if (message === 'info') {
        const properties = server.getProperties();
        const level = await sender[0].mapleWorld.getLevel();
        const players = await sender[0].mapleWorld.getOnlinePlayers();
        const text = [
            {
                text: ' -> flavor: ',
                color: 'gray',
            },
            {
                text: `${level.Data.ServerBrands}`,
                color: 'gold',
            },
            {
                text: ', version: ',
                color: 'gray',
            },
            {
                text: `${level.Data.Version.Name}`,
                color: 'gold',
            },
            {
                text: ', players: ',
                color: 'gray',
            },
            {
                text: `${players.length} / ${properties['max-players']}`,
                color: 'gold',
            },
        ];
        sender[0].sendCommand(`tellraw @s ${JSON.stringify(text)}`);
        return;
    }
});
