<div align=center>

# MapleServer
Enhance the vanilla server for Minecraft: Java Edition.

![License](https://img.shields.io/npm/l/maple-server)
![Version](https://img.shields.io/npm/v/maple-server)
![Downloads](https://img.shields.io/npm/dt/maple-server)

![MapleServer v0.1.1](https://user-images.githubusercontent.com/74240663/169854439-385338ae-1ea2-4a9c-99d3-6e10187c72f2.gif)  
The code for this example can be found in the [examples](examples/example.js) directory.

</div>

## Installation
```console
npm install maple-server
```

## Setup
1. Edit `server.properties` like this. Enter any password in `rcon.password`.
```properties
enable-rcon = true
rcon.port = 25575
rcon.password = <password>
```

2. Create an instance of MapleServer.  
   Enter the value of `rcon.password` in `password` and the path to the server directory in `directoryPath`.  
   In `args` enter the command options and arguments to start the server.
```js
const { MapleServer } = require('maple-server');

const server = new MapleServer({
    rconClient: {
        host: 'localhost',
        port: 25575,
        password: <password>,
    },
    server: {
        directoryPath: <path>,
    },
});

const args = ['-Xmx2G', '-Xms2G', '-jar', 'server.jar'];

server.start(args);
```

3. Run it, and if the Minecraft server starts successfully, the setup is complete.

## Events
The `MapleServer` class has these events:

### playerChat
Called when a player sends a chat.
| Parameter | Type | Description |
| :-: | :-: | :-: |
| sender | MaplePlayer[] | The chat sender |
| message | string | The message sent |

### playerQuit
Called when a player leaves a server.
| Parameter | Type | Description |
| :-: | :-: | :-: |
| player | MaplePlayer[] | Player who left the server |

### playerJoin
Called when a player joins a server.
| Parameter | Type | Description |
| :-: | :-: | :-: |
| player | MaplePlayer[] | Player who joined the server |

### serverStop
Called when a server is stopped.

### serverStart
Called when a server starts.

### ready
Called when a server is ready.

## License
[MIT](LICENSE)
