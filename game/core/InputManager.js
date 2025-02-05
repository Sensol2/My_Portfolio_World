import MonoBehaviour from "/game/core/MonoBehaviour.js";

class InputManager extends MonoBehaviour {
    static instance = null;

    constructor() {
        super();

        if (InputManager.instance) {
            return InputManager.instance; // 이미 인스턴스가 있으면 기존 인스턴스를 반환
        }

        InputManager.instance = this; // 싱글턴 인스턴스 저장

        this.keyPressed = new Set(); // 현재 눌려 있는 키를 저장
        this.keyMap = {
            "ArrowLeft": "LEFT",
            "ArrowRight": "RIGHT",
            "ArrowUp": "UP",
            "ArrowDown": "DOWN"
        };

        this.callbacks = {
            "LEFT": null,
            "RIGHT": null,
            "UP": null,
            "DOWN": null,
            "WHEEL_UP": null,
            "WHEEL_DOWN": null
        };

        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));
        window.addEventListener("wheel", (event) => this.onWheel(event));
    }

    static getInstance() {
        if (!InputManager.instance) {
            new InputManager();
        }
        return InputManager.instance;
    }

    setCallback(action, callback) {
        if (this.callbacks.hasOwnProperty(action)) {
            this.callbacks[action] = callback;
        }
    }

    update() {
        this.keyPressed.forEach((key) => {
            if (this.callbacks[key]) {
                this.callbacks[key](); // 등록된 콜백 함수 실행
            }
        });
    }

    onKeyDown(event) {
        if (this.keyMap[event.key]) {
            this.keyPressed.add(this.keyMap[event.key]);
        }
    }

    onKeyUp(event) {
        if (this.keyMap[event.key]) {
            this.keyPressed.delete(this.keyMap[event.key]);
        }
    }

    onWheel(event) {
        if (event.deltaY > 0 && this.callbacks["WHEEL_DOWN"]) {
            this.callbacks["WHEEL_DOWN"]();
        }
        if (event.deltaY < 0 && this.callbacks["WHEEL_UP"]) {
            this.callbacks["WHEEL_UP"]();
        }
    }
}

export default InputManager;
