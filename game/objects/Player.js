import GameObject from "../components/GameObject.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Animation from "/game/components/Animation.js";
import Animator from "/game/components/Animator.js";
import InputManager from "/game/core/InputManager.js";
import Rect from "/game/components/Rect.js";
import { rectangularCollision } from "/game/components/Collider.js";

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
        
        this.speed_x = 1;   //플레이어 x 이동속도
        this.speed_y = 1;   //플레이어 y 이동속도
        
        //이동 관련 함수 정의
        this.inputManager = InputManager.getInstance();
        this.inputManager.setCallback("LEFT", () => this.move(-1, 0));
        this.inputManager.setCallback("RIGHT", () => this.move(1, 0));
        this.inputManager.setCallback("UP", () => this.move(0, -1));
        this.inputManager.setCallback("DOWN", () => this.move(0, 1));

        //그래픽 관련 컴포넌트 정의
        this.spriteRenderer = this.addComponent(new SpriteRenderer("/Assets/Characters/Human/WALKING/base_walk_LEFT.png"));
        this.animator = this.addComponent(new Animator(this.spriteRenderer));
        this.animator.addAnimation(
            new Animation("WALK_LEFT", "/Assets/Characters/Human/WALKING/base_walk_LEFT.png", 8, 100),
            new Animation("WALK_RIGHT", "/Assets/Characters/Human/WALKING/base_walk_RIGHT.png", 8, 100),
            new Animation("ATTACKING", "/Assets/Characters/Human/ATTACK/base_attack_strip10.png", 10, 100),
        );
        this.animator.setAnimation("ATTACKING");

        this.offset = {offX: -5, offY: -8};
        this.rect = this.addComponent(new Rect(x, y, 10, 14))
        this.updateBound();

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

    // 별로 마음에는 안 들지만, GameManager에서 타일 배열을 주입받기 위해서
    setTiles(tiles) {
        this.tiles = tiles;
    }

    updateBound() {
        // Rect의 x, y 좌표를 중심 좌표로 설정
        this.rect.x = this.transform.x + this.offset.offX;
        this.rect.y = this.transform.y + this.offset.offY;
    }

    //메소드 오버라이딩
    move(dx, dy) {
        if (dx < 0)
            this.changeState(PlayerState.WALKING_LEFT);
        if (dx > 0)
            this.changeState(PlayerState.WALKING_RIGHT);

        var prevX = this.transform.x;
        var prevY = this.transform.y;


        this.transform.x += dx*this.speed_x;
        this.transform.y += dy*this.speed_y;

        this.updateBound();

        // 충돌 체크
        if (this.tiles) {
            for (const tile of this.tiles) {
                //console.log(tile)
                if (tile.tileCode === "WALL") {
                    if (rectangularCollision({ rect1: this.rect, rect2: tile.rect })) {
                        // console.log("Collision detected with tile:". tile);
                        //충돌 시 이동 취소
                        this.transform.x = prevX;
                        this.transform.y = prevY;
                        
                        this.updateBound();
                        break;
                    }
                }
            }
        }
    }


}

export default Player;
