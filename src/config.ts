import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1500,
  height: 800,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scale: { zoom: 0.8 }
};
