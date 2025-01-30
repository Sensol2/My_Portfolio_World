import GameObject from "/game/objects/GameObject.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Animation from "/game/components/Animation.js";
import Animator from "/game/components/Animator.js";


class Player extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.spriteRenderer = this.addComponent(new SpriteRenderer("/Assets/Characters/Human/WALKING/base_walk_LEFT.png"));

        this.animator = this.addComponent(new Animator(this.spriteRenderer));
        this.animator.addAnimation(
            new Animation("WALK_LEFT", "/Assets/Characters/Human/WALKING/base_walk_LEFT.png", 8, 100),
            new Animation("WALK_RIGHT", "/Assets/Characters/Human/WALKING/base_walk_RIGHT.png", 8, 100)
        );
        this.animator.setAnimation("WALK_RIGHT");
        this.animator.play();
    }
}

export default Player;
