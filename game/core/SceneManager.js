class SceneManager {
    constructor() {
        this.currentScene = null;
    }
    changeScene(newScene) {
        if (this.currentScene) this.currentScene.onExit();
        this.currentScene = newScene;
        this.currentScene.onEnter();
    }
    update(timestamp) {
        this.currentScene?.update(timestamp);
    }
    render(camera) {
        this.currentScene?.render(camera);
    }
    drawUI(camera) {
        this.currentScene?.drawUI(camera);
    }
}
export default new SceneManager();