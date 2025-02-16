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
    constructor(offsetX=0, offsetY=0, _scale=1) {
        super(offsetX, offsetY);

        // 캔버스 관련
        const [canvas, ctx] = this.createCanvas();
        this.canvas = canvas;
        this.ctx = ctx;

        // 카메라 좌표, 스케일 설정
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = _scale;

        // 타겟 오브젝트 관련
        this.target = null;

        // 줌인/아웃 설정
        this.inputManager = InputManager.getInstance();
        this.inputManager.setCallback("WHEEL_UP", () => this.zoomIn());
        this.inputManager.setCallback("WHEEL_DOWN", () => this.zoomOut());
    }

    update() {
        // 화면 중앙에 타겟 고정
        if (this.target) {
            this.offsetX = (this.target.transform.x - CANVAS_WIDTH/(2*this.scale));
            this.offsetY = (this.target.transform.y - CANVAS_HEIGHT/(2*this.scale));
        }
    }

    setTarget(target) {
        this.target = target;
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
        const drawX = (x - this.offsetX) * this.scale;
        const drawY = (y - this.offsetY) * this.scale;
        const drawWidth = (sWidth ?? img.width) * this.scale;
        const drawHeight = (sHeight ?? img.height) * this.scale;
    
        if (sx === null || sy === null || sWidth === null || sHeight === null) {
            this.ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        } else {
            this.ctx.drawImage(img, sx, sy, sWidth, sHeight, drawX, drawY, drawWidth, drawHeight);
        }
    }
    

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 카메라 이동 함수
    move(dx, dy) {
        this.offsetX += dx;
        this.offsetY += dy;
    }

    zoomIn() {
        this.scale += 0.1;
    }

    zoomOut() {
        this.scale -= 0.1;
    }
}

export default Camera;