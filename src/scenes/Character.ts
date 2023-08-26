import { AgentDTO } from "../connector/dtos";
import { MOVEMENT_SPEED, toPixelPosition, toTilePosition } from "../globals";


export default class Character {

    name: string;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bubble: Phaser.GameObjects.Image;
    emoji: Phaser.GameObjects.Text;
    movement: { col: number, row: number };
    description: string;
    location: string;
    activity: string;

    // reformat constructor arguments to match DTO
    constructor(name: string, 
                sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, 
                bubble: Phaser.GameObjects.Image, 
                emoji: Phaser.GameObjects.Text,
                movement: { col: number, row: number },
                description: string, 
                location: string, 
                activity: string) {
        this.name = name
        this.sprite = sprite
        this.bubble = bubble
        this.emoji = emoji
        this.movement = movement
        this.description = description
        this.location = location
        this.activity = activity
    }

    position(): { col: number, row: number } {
        return toTilePosition(this.sprite.x, this.sprite.y)
    }

    setEmoji(): void {
        
    }

    update(): void {
        const target = toPixelPosition(this.movement.col, this.movement.row)

        if(this.sprite.x < target.x) {
            this.sprite.anims.play(this.name + "-right-walk", true);
            this.sprite.x += MOVEMENT_SPEED;
            this.bubble.x += MOVEMENT_SPEED;
            this.emoji.x += MOVEMENT_SPEED;
        } else if(this.sprite.x > target.x) {
            this.sprite.anims.play(this.name + "-left-walk", true);
            this.sprite.x -= MOVEMENT_SPEED;
            this.bubble.x -= MOVEMENT_SPEED;
            this.emoji.x -= MOVEMENT_SPEED;
        } else if(this.sprite.y < target.y) {
            this.sprite.anims.play(this.name + "-down-walk", true);
            this.sprite.y += MOVEMENT_SPEED;
            this.bubble.y += MOVEMENT_SPEED;
            this.emoji.y += MOVEMENT_SPEED;
        } else if(this.sprite.y > target.y) {
            this.sprite.anims.play(this.name + "-up-walk", true);
            this.sprite.y -= MOVEMENT_SPEED;
            this.bubble.y -= MOVEMENT_SPEED;
            this.emoji.y -= MOVEMENT_SPEED;
        } else {
            this.sprite.anims.stop();
        }
    }

    toAgentDto(): AgentDTO {
        return {
            name: this.name,
            description: this.description,
            location: this.location,
            emoji: this.emoji.text,
            activity: this.activity,
            movement: {
                col: this.position().col,
                row: this.position().row
            }
        }
    }
}