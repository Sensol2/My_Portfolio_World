import GameObject from "../components/GameObject.js";
import InputManager from "/game/core/InputManager.js";
import elt from "/game/utils/elt.js";
/* 
==== camera.js =====
화면 렌더링, 카메라 이동 등 View 를 책임지고 관리하는 역할의 파일이다.
canvas를 생성하는 등 책임 범위가 크다. 확장 시 주의하도록 하자.
*/ 

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

class Camera extends GameObject {
    constructor(cameraX=0, cameraY=0, _scale=1) {
        super(cameraX, cameraY);

        // 캔버스 관련
        const [canvas, ctx] = this.createCanvas();
        this.canvas = canvas;
        this.ctx = ctx;

        // 카메라 좌표, 스케일 설정
        this.cameraX = cameraX;
        this.cameraY = cameraY;
        this.scale = _scale;

        // 타겟 오브젝트 관련
        this.target = null;

        // 줌인/아웃 설정
        this.inputManager = InputManager.getInstance();
        this.inputManager.setCallback("WHEEL_UP", () => this.zoomIn());
        this.inputManager.setCallback("WHEEL_DOWN", () => this.zoomOut());
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    moveCameraDoTarget(t) {
        // 화면 중앙에 타겟 고정 (lerp로 부드럽게 이동)
        if (this.target) {
            const targetX = this.target.transform.x - CANVAS_WIDTH / (2 * this.scale);
            const targetY = this.target.transform.y - CANVAS_HEIGHT / (2 * this.scale);

            // t 값(0~1, 값이 작을수록 더 천천히 따라감)
            const smoothness = t;
            this.cameraX = this.lerp(this.cameraX, targetX, smoothness);
            this.cameraY = this.lerp(this.cameraY, targetY, smoothness);
        }
    }

    update() {
        this.moveCameraDoTarget(0.08);
    }

    setTarget(target) {
        this.target = target;
        this.moveCameraDoTarget(1);
    }

    // 캔버스와 컨텍스트 초기화
    createCanvas() {
        const canvas = elt("canvas", {width: CANVAS_WIDTH, height: CANVAS_HEIGHT});
        if (!canvas.getContext) {
            console.error("Canvas context가 지원되지 않습니다.");
            return null;
        }

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.canvas = canvas;
        this.ctx = ctx;
        return [canvas, ctx];
    }

    getCanvas() {
        return [this.canvas, this.ctx];
    }

    displayImage(img, x, y, sx = null, sy = null, sWidth = null, sHeight = null) {
        this.ctx.imageSmoothingEnabled = false;
    
        // 좌표를 scale에 맞춰 변환
        const drawX = (x - this.cameraX) * this.scale;
        const drawY = (y - this.cameraY) * this.scale;
        const drawWidth = (sWidth ?? img.width) * this.scale;
        const drawHeight = (sHeight ?? img.height) * this.scale;
    
        if (sx === null || sy === null || sWidth === null || sHeight === null) {
            this.ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        } else {
            this.ctx.drawImage(img, sx, sy, sWidth, sHeight, drawX, drawY, drawWidth, drawHeight);
        }
    }

    displayText(text, x, y, font = "1px Arial",  color = "black") { 
        this.ctx.save();
        this.ctx.translate((x - this.cameraX) * this.scale, (y - this.cameraY) * this.scale);
        this.ctx.scale(this.scale, this.scale);

        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    }
    
    drawCollisionBox(rect, color = "red") {
        const drawX = (rect.x - this.cameraX) * this.scale;
        const drawY = (rect.y - this.cameraY) * this.scale;
        const drawWidth = rect.width * this.scale;
        const drawHeight = rect.height * this.scale;

        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(drawX, drawY, drawWidth, drawHeight);
        this.ctx.restore();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 카메라 이동 함수
    move(dx, dy) {
        this.cameraX += dx;
        this.cameraY += dy;
    }

    zoomIn() {
        this.scale += 0.1;
        this.moveCameraDoTarget(1);
    }

    zoomOut() {
        this.scale -= 0.1;
        this.moveCameraDoTarget(1);
    }
}

export default Camera;