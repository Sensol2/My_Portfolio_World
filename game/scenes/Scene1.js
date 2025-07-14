import Scene from "/game/core/Scene.js";
import Player from "/game/objects/Player.js";
import { Tile, EventTile } from "/game/components/Tile.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import GameObject from "/game/components/GameObject.js";
import { getEventData, getWallData } from "/Data/collisionTileData.js";

class Scene1 extends Scene {
    constructor(camera) {
        super();
        this.camera = camera;
    }

    init() {
        // BG 추가
        const bg = new GameObject(-5, 5);
        bg.addComponent(new SpriteRenderer("/Assets/Map/TestBG.png"));
        this.objects.push(bg);

        // 플레이어 추가
        const player = new Player(-100, 50);
        this.objects.push(player);
        this.camera.setTarget(player);

        // 벽 타일 추가
        this.initWallTiles(player);

        // 이벤트 타일 추가
        this.initEventTiles();

        const tile = new EventTile(0, 0, 500, 500, 9999);
        tile.setCallback("onEnter", () => {
            console.log("EventTile entered");
        });

    }

    async initWallTiles(player) {
        // 벽 타일 추가
        const [data, mapHeight, mapWidth] = await getWallData();
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

    async initEventTiles() {
        // 이벤트 타일 추가
        const [data, mapHeight, mapWidth] = await getEventData();
        const tiles = [];
        for (let i = 0; i < mapHeight; i++) {
            for (let j = 0; j < mapWidth; j++) {
                const tileValue = data[i][j];
                if (tileValue === 0) continue;

                const centerX = mapWidth / 2;
                const centerY = mapHeight / 2;
                const tileX = (j - centerX) * 16;
                const tileY = (i - centerY) * 16;
                const tile = new EventTile(tileX, tileY, 16, 16, tileValue);
                tile.setCallback("onEnter", () => {
                    console.log("EventTile entered");});
                this.objects.push(tile);
                tiles.push(tile);
            }
        }
    }
    
    onEnter() {
        this.init();
    }
}
export default Scene1;