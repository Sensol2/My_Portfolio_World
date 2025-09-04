import GameManager from "./GameManager.js";
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

        this.canvas = document.getElementById("game-canvas");
        this.keyPressed = new Set();
        this.isMouseDown = false;
        this.isTouchDown = false;

        this.mouseX = null;
        this.mouseY = null;

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
            "MOUSE_DOWN": null,
        };

        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));
        window.addEventListener("wheel", (event) => this.onWheel(event));
        window.addEventListener("mousedown", (event) => this.onMouseDown(event));
        window.addEventListener("mouseup", (event) => this.onMouseUp(event));
        window.addEventListener("mousemove", (event) => this.onMouseMove(event));
        this.canvas.addEventListener("touchstart", (event) => this.onTouchStart(event));
        this.canvas.addEventListener("touchend", (event) => this.onTouchEnd(event));
        this.canvas.addEventListener("touchcancel", (event) => this.onTouchCancel(event));
        this.canvas.addEventListener("touchmove", (event) => this.onTouchMove(event));
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

        if (this.isMouseDown || this.isTouchDown) {
            this.callbacks["MOUSE_DOWN"](this.mouseX, this.mouseY);
        }
    }

    onKeyDown(event) {
        this.keyPressed.add(event.key);
    }

    onKeyUp(event) {
        this.keyPressed.delete(event.key);
        this.callbacks["KEY_UP"]();
    }

    // 마우스 입력 처리
    onMouseDown(event) {
        this.isMouseDown = true;
    }

    onMouseUp(event) {
        this.isMouseDown = false;
    }

    onMouseMove(event) {
        const camera = GameManager.instance.camera;
        [this.mouseX, this.mouseY] = camera.getClientToWorld(event.clientX, event.clientY);
    }

    onWheel(event) {
        if (event.deltaY > 0 && this.callbacks["WHEEL_DOWN"]) {
            this.callbacks["WHEEL_DOWN"]();
        }
        if (event.deltaY < 0 && this.callbacks["WHEEL_UP"]) {
            this.callbacks["WHEEL_UP"]();
        }
    }


    // 터치 관련

    onTouchStart(event) { 
        this.isTouchDown = true;
        const touches = event.changedTouches;
        const camera = GameManager.instance.camera;
        [this.mouseX, this.mouseY] = camera.getClientToWorld(touches[0].clientX, touches[0].clientY);
    }

    onTouchMove(event) {
        const touches = event.changedTouches;

        const camera = GameManager.instance.camera;
        [this.mouseX, this.mouseY] = camera.getClientToWorld(touches[0].clientX, touches[0].clientY);
    }

    onTouchEnd(event) {
        this.isTouchDown = false;
    }

    onTouchCancel(event) {
        this.isTouchDown = false;
    }


}

export default InputManager;
