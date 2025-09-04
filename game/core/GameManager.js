import Camera from "./Camera.js";
import InputManager from "./InputManager.js";
import SceneManager from "./SceneManager.js";
import Scene1 from "../scenes/Scene1.js";


class GameManager {
    static instance = null;
    constructor() {
        // 게임매니저 싱글턴으로 관리
        if (GameManager.instance) {
            return GameManager.instance;
        }

        GameManager.instance = this;

        this.camera = new Camera();
        this.inputManager = InputManager.getInstance();
    }

    init() {
        const container = document.getElementById("game-container");
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");

        if (!this.canvas || !this.ctx) return;

        container.appendChild(this.canvas);

        // 최초 씬 설정
        const gameScene = new Scene1(this.camera);
        SceneManager.changeScene(gameScene);
    }

    loop(timestamp) {
        this.camera.clear();
        this.camera.update();
        
        SceneManager.update(timestamp);
        SceneManager.render(this.camera);
        SceneManager.drawUI(this.camera);
        this.inputManager.update();
        requestAnimationFrame((t) => this.loop(t));
    }
}

export default GameManager;
