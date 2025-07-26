import Collider from "./Collider.js";
import GameObject from "./GameObject.js";
import SpriteRenderer from "./SpriteRenderer.js";
import Transform from "./Transform.js";

// TileState 객체를 활성화하여 타일 상태를 관리
const TileState = Object.freeze({
    GROUND: "GROUND",
    EVENT: "EVENT",
    WALL: "WALL"
});

export class Tile extends GameObject{
    constructor(x, y, tileWidth, tileHeight, code=0) {
        super(x, y);
        this.id = null;
        this.transform.pivot = Transform.Pivot.TOP_LEFT;
        // tileCode는 getTileCode 메서드를 사용해 설정
        this.tileCode = this.getTileCode(code);
        //this.spriteRenderer = this.addComponent(new SpriteRenderer("/Assets/Tiles/wall-tile.png"));
        this.rect = this.addComponent(new Collider(x, y, tileWidth, tileHeight));
    }

    // tileCode 값을 code에 맞게 반환하는 메서드
    getTileCode(code) {
        switch (code) {
            case 0:
                return TileState.GROUND;
            case 18748:
                return TileState.WALL;
            case 19386:
                return TileState.EVENT;
            default:
                return TileState.GROUND;  // 기본값은 GROUND
        }
    }

    drawDebug(camera) {
        if (this.tileCode === "WALL" && this.rect) {
            camera.drawCollisionBox(this.rect, "blue");
        }
        if (this.tileCode === "EVENT" && this.rect) {
            camera.drawCollisionBox(this.rect, "green");
        }
    }

    setCallback(action, callback) {
        if (this.callbacks.hasOwnProperty(action)) {
            this.callbacks[action] = callback;
        }
    }
}
export class EventTile extends Tile {
    constructor(x, y, tileWidth, tileHeight, code=0) {
        super(x, y, tileWidth, tileHeight, code);
        this.title = null;
        this.content = null;
        this.callbacks = {
            onEnter: null,
            onExit: null
        };
    }

    setTitleAndContent(title, content) {
        this.title = title;
        this.content = content;
    }

    setCallback(action, callback) {
        if (this.callbacks.hasOwnProperty(action)) {
            this.callbacks[action] = callback;
        }
    }

    triggerEnter() {
        if (this.callbacks.onEnter) {
            this.callbacks.onEnter();
        }
    }

    triggerExit() {
        if (this.callbacks.onExit) {
            this.callbacks.onExit();
        }
    }
}