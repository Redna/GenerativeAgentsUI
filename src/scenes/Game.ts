import Phaser from 'phaser';
import Character from './Character';
export default class Demo extends Phaser.Scene {

  private character_names: { [key: string]: number[] } = {
    "Klaus_Mueller": [127, 46],
    "Maria_Lopez": [123, 57],
    "Tom_Moreno": [73, 14],
  }

  private tile_width = 32

  private map: Phaser.Tilemaps.Tilemap | undefined

  private personas: any = {};
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.tilemapTiledJSON("map", "./assets/the_ville/visuals/the_ville_jan7.json");
    this.load.image("blocks_1", "assets/the_ville/visuals/map_assets/blocks/blocks_1.png");
    this.load.image("walls", "assets/the_ville/visuals/map_assets/v1/Room_Builder_32x32.png");
    this.load.image("interiors_pt1", "assets/the_ville/visuals/map_assets/v1/interiors_pt1.png");
    this.load.image("interiors_pt2", "assets/the_ville/visuals/map_assets/v1/interiors_pt2.png");
    this.load.image("interiors_pt3", "assets/the_ville/visuals/map_assets/v1/interiors_pt3.png");
    this.load.image("interiors_pt4", "assets/the_ville/visuals/map_assets/v1/interiors_pt4.png");
    this.load.image("interiors_pt5", "assets/the_ville/visuals/map_assets/v1/interiors_pt5.png");
    this.load.image("CuteRPG_Field_B", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Field_B.png");
    this.load.image("CuteRPG_Field_C", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Field_C.png");
    this.load.image("CuteRPG_Harbor_C", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Harbor_C.png");
    this.load.image("CuteRPG_Village_B", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Village_B.png");
    this.load.image("CuteRPG_Forest_B", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Forest_B.png");
    this.load.image("CuteRPG_Desert_C", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Desert_C.png");
    this.load.image("CuteRPG_Mountains_B", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Mountains_B.png");
    this.load.image("CuteRPG_Desert_B", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Desert_B.png");
    this.load.image("CuteRPG_Forest_C", "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Forest_C.png");

    this.load.atlas("atlas", "./assets/characters/Yuriko_Yamamoto.png",
      "./assets/characters/atlas.json");

    for (let character_name in this.character_names) {
      const character_path = "./assets/characters/" + character_name + ".png";
      this.load.atlas(character_name, character_path, "./assets/characters/atlas.json")
    }

    this.load.image('speech_bubble', "./assets/speech_bubble/v3.png");
  }

  private loadTileset(name: string, image_name: string): Phaser.Tilemaps.Tileset {
    const tileset = this.map!.addTilesetImage(name, image_name);

    if (tileset == null) {
      throw Error("Tileset with name " + name + " not found!!")
    }

    return tileset
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });

    const tilesetGroup: Phaser.Tilemaps.Tileset[] = []
    const collisions: Phaser.Tilemaps.Tileset[] = []
    const walls: Phaser.Tilemaps.Tileset[] = []


    collisions.push(this.loadTileset("blocks", "blocks_1"))
    walls.push(this.loadTileset("Room_Builder_32x32", "walls"))

    const mixedTileset = this.loadTileset("CuteRPG_Field_C", "CuteRPG_Field_C")

    walls.push(mixedTileset)

    tilesetGroup.push(mixedTileset)
    tilesetGroup.push(this.loadTileset("interiors_pt1", "interiors_pt1"))
    tilesetGroup.push(this.loadTileset("interiors_pt2", "interiors_pt2"))
    tilesetGroup.push(this.loadTileset("interiors_pt3", "interiors_pt3"))
    tilesetGroup.push(this.loadTileset("interiors_pt4", "interiors_pt4"))
    tilesetGroup.push(this.loadTileset("interiors_pt5", "interiors_pt5"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Field_B", "CuteRPG_Field_B"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Harbor_C", "CuteRPG_Harbor_C"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Village_B", "CuteRPG_Village_B"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Forest_B", "CuteRPG_Forest_B"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Desert_C", "CuteRPG_Desert_C"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Mountains_B", "CuteRPG_Mountains_B"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Desert_B", "CuteRPG_Desert_B"))
    tilesetGroup.push(this.loadTileset("CuteRPG_Forest_C", "CuteRPG_Forest_C"))

    this.map.createLayer("Bottom Ground", tilesetGroup, 0, 0);
    this.map.createLayer("Exterior Ground", tilesetGroup, 0, 0);
    this.map.createLayer("Exterior Decoration L1", tilesetGroup, 0, 0);
    this.map.createLayer("Exterior Decoration L2", tilesetGroup, 0, 0);
    this.map.createLayer("Interior Ground", tilesetGroup, 0, 0);
    this.map.createLayer("Wall", walls, 0, 0);
    this.map.createLayer("Interior Furniture L1", tilesetGroup, 0, 0);
    this.map.createLayer("Interior Furniture L2 ", tilesetGroup, 0, 0);

    const foregroundL1Layer = this.map.createLayer("Foreground L1", tilesetGroup, 0, 0);
    const foregroundL2Layer = this.map.createLayer("Foreground L2", tilesetGroup, 0, 0);
    const collisionsLayer = this.map.createLayer("Collisions", collisions, 0, 0);

    collisionsLayer!.setCollisionByProperty({ collide: true });
    // By default, everything gets depth sorted on the screen in the order we 
    // created things. Here, we want the "Above Player" layer to sit on top of 
    // the player, so we explicitly give it a depth. Higher depths will sit on 
    // top of lower depth objects.
    // Collisions layer should get a negative depth since we do not want to see
    // it. 
    collisionsLayer!.setDepth(-1);
    foregroundL1Layer!.setDepth(2);
    foregroundL2Layer!.setDepth(2);

    this.player = this.physics.add.sprite(2400, 588, "atlas", "down").setSize(30, 40).setOffset(0, 0);

    this.player.setDepth(-1);
    // Setting up the camera. 
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    for (let name in this.character_names) {
      this.personas[name] = this.spawnSprite(name, this.character_names[name][0], this.character_names[name][1])
    }

    

  }

  update(time: number, delta: number): void {
    const camera_speed = 400;
    // Stop any previous movement from the last frame

    let player = this.player!
    let cursors = this.input!.keyboard!.createCursorKeys();

    player.body.setVelocity(0);
    if (cursors.left.isDown) {
      player.body.setVelocityX(-camera_speed);
    }
    if (cursors.right.isDown) {
      player.body.setVelocityX(camera_speed);
    }
    if (cursors.up.isDown) {
      player.body.setVelocityY(-camera_speed);
    }
    if (cursors.down.isDown) {
      player.body.setVelocityY(camera_speed);
    }

  }

  spawnSprite(name: string, cellX: number, cellY: number): Character {
    let posX = cellX * this.tile_width + this.tile_width / 2;
    let posY = cellY * this.tile_width + this.tile_width;

    let sprite = this.physics.add
      .sprite(posX, posY, name, "down")
      .setSize(30, 40)
      .setOffset(0, 0);

    sprite.displayWidth = 40;
    sprite.scaleY = sprite.scaleX;

    let bubble = this.add.image(posX + 60, posY - 40, 'speech_bubble').setDepth(3);
    bubble.displayWidth = 110;
    bubble.displayHeight = 50;

    const textStyle = {
      font: "28px monospace",
      color: "#000000",
      padding: { x: 8, y: 8 }
    }

    this.add.text(posX + 10, posY - 67, this.getInitials(name) + ": ", textStyle).setDepth(3);
    let emoji = this.add.text(posX + 65, posY - 67,"🦁", textStyle).setDepth(3);

    this.createSpriteAnimation(name);

    return new Character(name, sprite, bubble, emoji);
  }
  
  private getInitials(name: string): string {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let matches = [...name.matchAll(rgx)] || [];
    let initials = ((matches.shift()?.[1] || '') + (matches.pop()?.[1] || '')).toUpperCase();
    return initials
  }

  private createSpriteAnimation(name: string) {
    let left_walk_name = name + "-left-walk";
    let right_walk_name = name + "-right-walk";
    let down_walk_name = name + "-down-walk";
    let up_walk_name = name + "-up-walk";

    console.log(name, left_walk_name, "DEUBG")
    this.anims.create({
      key: left_walk_name,
      frames: this.anims.generateFrameNames(name, { prefix: "left-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: right_walk_name,
      frames: this.anims.generateFrameNames(name, { prefix: "right-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: down_walk_name,
      frames: this.anims.generateFrameNames(name, { prefix: "down-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: up_walk_name,
      frames: this.anims.generateFrameNames(name, { prefix: "up-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 4,
      repeat: -1
    });
  }

}
