import { io, Socket } from "socket.io-client"
import { AgentDTO, RoundUpdateDTO } from "./dtos";
import Character from "../scenes/character";
import SimulationEventQueue from "./SimulationEventQueue";

interface ServerToClientEvents {
    update: (roundUpdate: RoundUpdateDTO) => void;
  }
  
  interface ClientToServerEvents {
    watch: () => void;
    spawn: (agent: AgentDTO) => void;
  }

export default class SimulationConnector {

    private socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    updateQueue: SimulationEventQueue;

    // constructor
    constructor() {
        this.socket = io("http://localhost:8080");
        this.updateQueue = new SimulationEventQueue()
    }

    registerListeners() {
        this.socket.on("update", (roundUpdate: RoundUpdateDTO) => {
            // Seems like a bug of socket.io that the payload is not properly parsed...
            if(typeof(roundUpdate) === "string") {
                this.updateQueue.enqueue(JSON.parse(roundUpdate))
            }
            else {
                this.updateQueue.enqueue(roundUpdate)
            }
                
        });
    }

    start() {
        console.log("Something")
        this.socket.emit("watch")
        this.registerListeners()
    }

    spawn(character: Character) {
        this.socket.emit("spawn", character.toAgentDto())
    }

}
