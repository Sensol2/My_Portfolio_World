import Rect from "/game/components/Rect.js";
import GameObject from "/game/components/GameObject.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Transform from "/game/components/Transform.js";

// TileState 객체를 활성화하여 타일 상태를 관리
const TileState = Object.freeze({
    GROUND: "GROUND",
    WATER: "WATER",
    WALL: "WALL"
});

class Tile extends GameObject{
    constructor(x, y, tileWidth, tileHeight, code=0) {
        super(x, y);
        this.transform.pivot = Transform.Pivot.TOP_LEFT;
        //this.isMoveable = true;
        // tileCode는 getTileCode 메서드를 사용해 설정
        this.tileCode = this.getTileCode(code);
        this.spriteRenderer = this.addComponent(new SpriteRenderer("/Assets/Tiles/wall-tile.png"));
        this.rect = this.addComponent(new Rect(x, y, tileWidth, tileHeight));
    }

    // tileCode 값을 code에 맞게 반환하는 메서드
    getTileCode(code) {
        switch (code) {
            case 0:
                return TileState.GROUND;
            case 2352:
                return TileState.WALL;
            default:
                return TileState.GROUND;  // 기본값은 GROUND
        }
    }

}

export default Tile;