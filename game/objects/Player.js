import GameObject from "../components/GameObject.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Animation from "/game/components/Animation.js";
import Animator from "/game/components/Animator.js";
import InputManager from "/game/core/InputManager.js";

// 플레이어 STATE 정의. FSM 패턴 사용
const PlayerState = Object.freeze({
    IDLE: "IDLE",
    WALKING_LEFT: "WALKING_LEFT",
    WALKING_RIGHT: "WALKING_RIGHT",
    ATTACKING: "ATTACKING",
    DEAD: "DEAD"
});

class Player extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.playerState = PlayerState.IDLE;
        
        this.speed_x = 3;   //플레이어 x 이동속도
        this.speed_y = 3;   //플레이어 y 이동속도

        //이동 관련 함수 정의
        this.inputManager = InputManager.getInstance();
        this.inputManager.setCallback("LEFT", () => this.move(-1, 0));
        this.inputManager.setCallback("RIGHT", () => this.move(1, 0));
        this.inputManager.setCallback("UP", () => this.move(0, -1));
        this.inputManager.setCallback("DOWN", () => this.move(0, 1));


        this.spriteRenderer = this.addComponent(new SpriteRenderer("/Assets/Characters/Human/WALKING/base_walk_LEFT.png"));
        this.animator = this.addComponent(new Animator(this.spriteRenderer));
        this.animator.addAnimation(
            new Animation("WALK_LEFT", "/Assets/Characters/Human/WALKING/base_walk_LEFT.png", 8, 100),
            new Animation("WALK_RIGHT", "/Assets/Characters/Human/WALKING/base_walk_RIGHT.png", 8, 100),
            new Animation("ATTACKING", "/Assets/Characters/Human/ATTACK/base_attack_strip10.png", 10, 100),
        );
        this.animator.setAnimation("ATTACKING");
    }

    update(timestamp) {
        this.animator.update(timestamp);
        this.updateAnimation();
    }

    changeState(newState) {
        if (!Object.values(PlayerState).includes(newState)) {
            console.error(`Invalid state: ${newState}`);
            return;
        }
        this.playerState = newState;
        this.updateAnimation();
    }

    updateAnimation() {
        switch(this.playerState) {
            case PlayerState.IDLE:
                this.animator.setAnimation("WALK_LEFT"); // 나중에 IDLE로 바꾸기
                break;
            case PlayerState.WALKING_LEFT:
                this.animator.setAnimation("WALK_LEFT");
                break;
            case PlayerState.WALKING_RIGHT:
                this.animator.setAnimation("WALK_RIGHT");
                break;   
            case PlayerState.ATTACKING:
                this.animator.setAnimation("ATTACKING");
                break;
        }
    }

    //메소드 오버라이딩
    move(dx, dy) {
        if (dx < 0)
            this.changeState(PlayerState.WALKING_LEFT);
        if (dx > 0)
            this.changeState(PlayerState.WALKING_RIGHT);

        this.transform.x += dx*this.speed_x;
        this.transform.y += dy*this.speed_y;
    }
}

export default Player;
