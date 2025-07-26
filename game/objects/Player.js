import GameObject from "../components/GameObject.js";
import SpriteRenderer from "../components/SpriteRenderer.js";
import Animation from "../components/Animation.js";
import Animator from "../components/Animator.js";
import InputManager from "../core/InputManager.js";
import Collider from "../components/Collider.js";
import { rectangularCollision } from "../components/Collider.js";

// 플레이어 STATE 정의. FSM 패턴 사용
const PlayerState = Object.freeze({
    IDLE_LEFT: "IDLE_LEFT",
    IDLE_RIGHT: "IDLE_RIGHT",
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
        this.inputManager.setCallback("ArrowLeft", () => this.move(-1, 0));
        this.inputManager.setCallback("ArrowRight", () => this.move(1, 0));
        this.inputManager.setCallback("ArrowUp", () => this.move(0, -1));
        this.inputManager.setCallback("ArrowDown", () => this.move(0, 1));
        this.inputManager.setCallback("KEY_UP", () => { this.stop(); });

        //그래픽 관련 컴포넌트 정의
        this.spriteRenderer = this.addComponent(new SpriteRenderer("../../Assets/Characters/Human/WALKING/base_walk_LEFT.png"));
        this.animator = this.addComponent(new Animator(this.spriteRenderer));
        this.animator.addAnimation(
            new Animation("IDLE_LEFT", "../../Assets/Characters/Human/IDLE/base_idle_LEFT.png", 9, 100),
            new Animation("IDLE_RIGHT", "../../Assets/Characters/Human/IDLE/base_idle_RIGHT.png", 9, 100),
            new Animation("WALK_LEFT", "../../Assets/Characters/Human/WALKING/base_walk_LEFT.png", 8, 100),
            new Animation("WALK_RIGHT", "../../Assets/Characters/Human/WALKING/base_walk_RIGHT.png", 8, 100),
            new Animation("ATTACKING", "../../Assets/Characters/Human/ATTACK/base_attack_strip10.png", 10, 100),
        );
        this.animator.setAnimation("IDLE_RIGHT");

        this.offset = {offX: -5, offY: -8};

        this.tiles = [];
        this.currentBoundingTiles = new Set()
        this.rect = this.addComponent(new Collider(x, y, 10, 14))
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
            case PlayerState.IDLE_LEFT:
                this.animator.setAnimation("IDLE_LEFT");
                break;
            case PlayerState.IDLE_RIGHT:
                this.animator.setAnimation("IDLE_RIGHT");
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

    // TODO : 별로 마음에는 안 들지만, GameManager에서 타일 배열을 주입받기 위해서
    addTiles(tiles) {
        this.tiles = [...this.tiles, ...tiles];
    }

    updateBound() {
        // Collider의 x, y 좌표를 중심 좌표로 설정
        this.rect.x = this.transform.x + this.offset.offX;
        this.rect.y = this.transform.y + this.offset.offY;
    }

    drawDebug(camera) {
        if (this.rect) camera.drawCollisionBox(this.rect, "red");
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
        // TODO: 타일 배열을 Player 외부에서 관리하게 만들기
        if (this.tiles) {
            for (const tile of this.tiles) {
                if (tile.tileCode === "WALL") {
                    if (rectangularCollision({ rect1: this.rect, rect2: tile.rect })) {
                        //충돌 시 이동 취소
                        this.transform.x = prevX;
                        this.transform.y = prevY;
                        
                        this.updateBound();
                        break;
                    }
                }
                if (tile.tileCode === "EVENT") {
                    if (rectangularCollision({ rect1: this.rect, rect2: tile.rect })) {
                        // STAY
                        if (this.currentBoundingTiles.has(tile)) { 
                            // STAY
                        }
                        // ENTER
                        else {
                            tile.triggerEnter();
                            this.currentBoundingTiles.add(tile);
                        }
                    }
                    else {
                        // EXIT
                        if (this.currentBoundingTiles.has(tile)) {
                            tile.triggerExit();
                            this.currentBoundingTiles.delete(tile);
                        }
                    }
                }
            }
        }
    }

    stop() {
        if (this.playerState === PlayerState.WALKING_LEFT) {
            this.changeState(PlayerState.IDLE_LEFT);
        }
        else if (this.playerState === PlayerState.WALKING_RIGHT) {
            this.changeState(PlayerState.IDLE_RIGHT);
        }
    }
}

export default Player;
