import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Camera from "/game/core/Camera.js";
import InputManager from "/game/core/InputManager.js";
import GameObject from "../components/GameObject.js";
import Player from "/game/objects/Player.js";


class GameManager {
    constructor() {
        this.camera = new Camera();
        this.objects = [];
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

        // 인풋매니저 추가
        this.inputManager = new InputManager(player);
    }

    loop(timestamp) {
        this.camera.clear();

        // 이 부분은 나중에 손보자 코드 더럽다
        for (const obj of this.objects) {
            obj.update(timestamp);
            obj.render(this.camera);
        }
        this.camera.update();
        // 입력 처리
        this.inputManager.update();
        requestAnimationFrame((t) => this.loop(t));
    }
}

export default GameManager;
