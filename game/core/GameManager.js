import Camera from "/game/core/Camera.js";
import InputManager from "/game/core/InputManager.js";
import SceneManager from "/game/core/SceneManager.js";
import Scene1 from "/game/scenes/Scene1.js";


class GameManager {
    constructor() {
        this.camera = new Camera();
        this.inputManager = InputManager.getInstance(); // 싱글턴으로 한 번만
    }

    init() {
        const container = document.getElementById("game-container");
        const [canvas, ctx] = this.camera.getCanvas();

        if (!canvas || !ctx) return;

        container.appendChild(canvas);

        // 최초 씬 설정
        const gameScene = new Scene1(this.camera);
        SceneManager.changeScene(gameScene);
    }

    loop(timestamp) {
        this.camera.clear();
        this.camera.update();
        
        SceneManager.update(timestamp);
        SceneManager.render(this.camera);
        this.inputManager.update();
        requestAnimationFrame((t) => this.loop(t));
    }
}

export default GameManager;
