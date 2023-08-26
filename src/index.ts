import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/game';
import SimulationConnector from './connector/simulationConnector';



const connector = new SimulationConnector()
connector.start()

new Phaser.Game(
  Object.assign(config, {
    scene: [new GameScene(connector)]
  })
);

