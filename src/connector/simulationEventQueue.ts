
// Queue implementation which will store all update events from the server
// The queue will be processed by the game loop

import { RoundUpdateDTO } from "./dtos";

interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
  }

export default class SimulationEventQueue implements IQueue<RoundUpdateDTO>{
    private storage: RoundUpdateDTO[] = [];

    enqueue(item: RoundUpdateDTO): void {
          this.storage.push(item);
    }
    dequeue(): RoundUpdateDTO | undefined {
        return this.storage.shift();
    }
    size(): number {
        return this.storage.length;
    }

}