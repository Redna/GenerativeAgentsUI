

export default class Character {

    name: string;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bubble: Phaser.GameObjects.Image;
    emoji: Phaser.GameObjects.Text

    constructor(name: string, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, bubble: Phaser.GameObjects.Image, emoji: Phaser.GameObjects.Text) {
        this.name = name
        this.sprite = sprite
        this.bubble = bubble
        this.emoji = emoji
    }
}