import MonoBehaviour from "/game/core/MonoBehaviour.js";

class InputManager extends MonoBehaviour {
    constructor(gameobject) {
        super();
        this.gameobject = gameobject;
        this.keyPressed = new Set(); // 현재 눌려 있는 키를 저장

        this.keyMap = {
            "ArrowLeft": "LEFT",
            "ArrowRight": "RIGHT",
            "ArrowUp": "UP",
            "ArrowDown": "DOWN"
        };

        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));
    }

    update() {
        if (this.keyPressed.has("LEFT")) {
            this.gameobject.move(-1, 0);
        }
        if (this.keyPressed.has("RIGHT")) {
            this.gameobject.move(1, 0);
        }
        if (this.keyPressed.has("UP")) {
            this.gameobject.move(0, -1);
        }
        if (this.keyPressed.has("DOWN")) {
            this.gameobject.move(0, 1);
        }
    }

    onKeyDown(event) {
        if (this.keyMap[event.key]) {
            this.keyPressed.add(this.keyMap[event.key]); // 키가 눌리면 저장
        }
    }

    onKeyUp(event) {
        if (this.keyMap[event.key]) {
            this.keyPressed.delete(this.keyMap[event.key]); // 키에서 손을 떼면 삭제
        }
    }
}

export default InputManager;
