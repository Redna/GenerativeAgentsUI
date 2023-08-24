import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import SimulationConnector from './connector/SimulationConnector';



const connector = new SimulationConnector()
connector.start()

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);

