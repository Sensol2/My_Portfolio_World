import Scene from "/game/core/Scene.js";
import Player from "/game/objects/Player.js";
import Tile from "/game/components/Tile.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import GameObject from "/game/components/GameObject.js";
import { generateTileMap, getTileMapSize } from "/Data/collisionTileData.js";

class Scene1 extends Scene {
    constructor(camera) {
        super();
        this.camera = camera;
    }
    init() {
        // BG 추가
        const bg = new GameObject(0, 0);
        bg.addComponent(new SpriteRenderer("/Assets/Map/TestBG.png"));
        this.objects.push(bg);

        // 플레이어 추가
        const player = new Player(0, 0);
        this.objects.push(player);
        this.camera.setTarget(player);

        // 타일 추가
        const data = generateTileMap();
        const [mapHeight, mapWidth] = getTileMapSize();
        const tiles = [];
        for (let i = 0; i < mapHeight; i++) {
            for (let j = 0; j < mapWidth; j++) {
                const tileValue = data[i][j];
                if (tileValue === 0) continue;

                const centerX = mapWidth / 2;
                const centerY = mapHeight / 2;
                const tileX = (j - centerX) * 16;
                const tileY = (i - centerY) * 16;
                const tile = new Tile(tileX, tileY, 16, 16, tileValue);
                this.objects.push(tile);
                tiles.push(tile);
            }
        }
        player.setTiles(tiles);
    }
    onEnter() {
        this.init();
    }
}
export default Scene1;