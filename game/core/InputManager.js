import MonoBehaviour from "./MonoBehaviour.js";

class InputManager extends MonoBehaviour {
    static instance = null;

    constructor() {
        super();

        // 인풋매니저는 싱글턴으로 관리
        if (InputManager.instance) {
            return InputManager.instance;
        }

        InputManager.instance = this;

        this.keyPressed = new Set();

        // 방향키 눌릴때 실행할 함수 매핑
        // KEY_UP: 어떤 키든 KeyUp 이벤트 발생 시 실행, 플레이어 정지 상태 판정을 위해 사용
        this.callbacks = {
            "KEY_UP": null,
            "ArrowLeft": null,
            "ArrowRight": null,
            "ArrowUp": null,
            "ArrowDown": null,
            "w": null,
            "a": null,
            "s": null,
            "d": null,
            "WHEEL_UP": null,
            "WHEEL_DOWN": null,
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
        // 방향키 눌려있는 동안
        this.keyPressed.forEach((key) => {
            if (this.callbacks[key]) {
                this.callbacks[key](); // 계속 등록된 콜백 함수 실행
            }
        });
    }

    onKeyDown(event) {
        this.keyPressed.add(event.key);
    }

    onKeyUp(event) {
        this.keyPressed.delete(event.key);
        this.callbacks["KEY_UP"]();
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
