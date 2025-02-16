import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Camera from "/game/core/Camera.js";
import InputManager from "/game/core/InputManager.js";
import GameObject from "../components/GameObject.js";
import Player from "/game/objects/Player.js";
import generateCollisionMap from "/Data/collisionTileData.js";
import Tile from "/game/components/Tile.js";


class GameManager {
    constructor() {
        this.camera = new Camera();
        this.objects = [];
        this.tiles = [];
    }

    init() {
        const container = document.getElementById("game-container");
        const [canvas, ctx] = this.camera.getCanvas();

        if (!canvas || !ctx) return;

        container.appendChild(canvas);

        // BG 추가
        const bg = new GameObject(0, 0);
        bg.addComponent(new SpriteRenderer("/Assets/Map/Lunadew_Valley.png"));
        this.objects.push(bg);

        // 플레이어 추가
        const player = new Player(0, 0);
        this.objects.push(player);
        this.camera.setTarget(player);

        // 벽 추가
        const data = generateCollisionMap(); // 충돌 맵 데이터 가져오기
        const mapHeight = data.length;       // 세로 타일 개수 (행)
        const mapWidth = data[0].length;     // 가로 타일 개수 (열)
        
        // 맵의 중심 계산 (화면 중앙을 기준으로 배치)
        const centerX = 25;
        const centerY = 15;
        
        for (let i = 0; i < mapHeight; i++) {
            for (let j = 0; j < mapWidth; j++) {
                const tileValue = data[i][j];
        
                // 타일이 비어있으면 추가하지 않음 (예: 0인 경우 무시 가능)
                if (tileValue === 0) continue;
        
                // 중앙 기준으로 타일 위치 조정
                const tileX = (j - centerX) * 16;
                const tileY = (i - centerY) * 16;
        
                // 타일 객체 생성 후 배열에 추가
                const tile = new Tile(tileX, tileY, 16, 16, tileValue);
                this.tiles.push(tile);
            }
        }



        // 인풋매니저 추가
        this.inputManager = new InputManager(player);
    }

    loop(timestamp) {
        this.camera.clear();
        this.camera.update();
        
        // 이 부분은 나중에 손보자 코드 더럽다
        for (let obj of this.objects) {
            obj.update(timestamp);
            obj.render(this.camera);
        }

        for (let tile of this.tiles) {
            tile.render(this.camera);
        }

        // 입력 처리
        this.inputManager.update();
        requestAnimationFrame((t) => this.loop(t));
    }
}

export default GameManager;
