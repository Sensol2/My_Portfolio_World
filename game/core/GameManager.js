import SpriteRenderer from "/game/components/SpriteRenderer.js";
import Camera from "/game/core/Camera.js";
import Renderer from "/game/core/Renderer.js";
import GameObject from "/game/objects/GameObject.js";
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

        const bg = new GameObject(-550, -300);
        bg.addComponent(new SpriteRenderer("/Assets/Map/Lunadew_Valley.png"));
        this.objects.push(bg);

        // 플레이어 추가
        const player = new Player(0, 0);
        this.objects.push(player);


    }

    loop() {
        Renderer.render(this.camera, this.objects);
        requestAnimationFrame(() => this.loop());
    }
}

export default GameManager;
