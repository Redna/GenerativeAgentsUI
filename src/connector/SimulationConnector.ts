import { io, Socket } from "socket.io-client"

interface ServerToClientEvents {
    update: (roundUpdate: RoundUpdateDTO) => void;
  }
  
  interface ClientToServerEvents {
    watch: (data: string) => void;
  }

export default class SimulationConnector {

    private socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    // constructor
    constructor() {
        this.socket = io("http://localhost:8080");
    }

    registerListeners() {
        this.socket.on("update", (roundUpdate: RoundUpdateDTO) => {
            console.log("Connected", roundUpdate)
        });
    }

    start() {
        console.log("Something")
        this.socket.emit("watch", "xyz")
        this.registerListeners()
    }

}
