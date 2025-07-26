import Scene from "../core/Scene.js";
import Player from "../objects/Player.js";
import { Tile, EventTile } from "../components/Tile.js";
import SpriteRenderer from "../components/SpriteRenderer.js";
import GameObject from "../components/GameObject.js";
import Text from "../components/Text.js";
import { getTilemapData } from "../../Data/collisionTileData.js";
import TileEvents from "../../Data/portfolioTextData.js";



class Scene1 extends Scene {
    constructor(camera) {
        super();
        this.camera = camera;
    }

    init() {
        // BG 추가
        const bg = new GameObject(-5, 5);
        bg.addComponent(new SpriteRenderer("./Assets/Map/MyPortfolioWorld_BG.png"));
        this.objects.push(bg);

        // 플레이어 추가
        const player = new Player(-80, 50);
        this.objects.push(player);
        this.camera.setTarget(player);

        // 벽 타일 추가
        this.initWallTiles(player);

        // 이벤트 타일 추가
        this.initEventTiles(player);

        // 이벤트 정의
        this.tileEvents = new TileEvents();
        this.tileEvents.setPlayer(player);
        this.tileEvents.setUIObjects(this.uiObjects);


        // 테스트 텍스트 출력
        // this.testText = new Text("Hello, World!", -50, 0, "10px Arial", "#000000ff");
        // this.uiObjects.push(this.testText);
    }


    // TODO: initWalltiles와 initEventTiles 두 함수 통합하기
    async initWallTiles(player) {
        // 벽 타일 추가
        const [data, mapHeight, mapWidth] = await getTilemapData("Collision");
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
        player.addTiles(tiles);
    }

    async initEventTiles(player) {
        // 이벤트 타일 추가
        const [data, mapHeight, mapWidth] = await getTilemapData("Event");
        const tiles = [];
        var count = 0;
        for (let i = 0; i < mapHeight; i++) {
            for (let j = 0; j < mapWidth; j++) {
                const tileValue = data[i][j];
                if (tileValue === 0) continue;

                const centerX = mapWidth / 2;
                const centerY = mapHeight / 2;
                const tileX = (j - centerX) * 16;
                const tileY = (i - centerY) * 16;
                const tile = new EventTile(tileX, tileY, 16, 16, tileValue);
                tile.id = count;

                tile.setCallback("onEnter", () => {
                    console.log("EventTile entered / tile id is", tile.id);
                    this.tileEvents.onEnterEvent(tile.id);
                });

                tile.setCallback("onExit", () => {
                    console.log("EventTile exited / tile id is", tile.id);
                    this.tileEvents.onExitEvent(tile.id);
                });

                this.objects.push(tile);
                tiles.push(tile);
                count++;
            }
        }

        player.addTiles(tiles);
    }
    
    onEnter() {
        this.init();
    }
}
export default Scene1;