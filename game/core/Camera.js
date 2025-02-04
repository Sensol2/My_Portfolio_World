import GameObject from "../components/GameObject.js";
import elt from "/game/utils/elt.js";
/* 
==== camera.js =====
화면 렌더링, 카메라 이동 등 View 를 책임지고 관리하는 역할의 파일이다.
canvas를 생성하는 등 책임 범위가 크다. 확장 시 주의하도록 하자.
*/ 

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

class Camera extends GameObject {
    constructor(_offsetX=0, _offsetY=0, _scale=5.0) {
        super(_offsetX, _offsetY);
        const [canvas, ctx] = this.createCanvas();
        this.canvas = canvas;
        this.ctx = ctx;
        this.offsetX = _offsetX;
        this.offsetY = _offsetY;
        this.scale = _scale;
        // this.target = null;
    }

    update() {
        // if (target) {
        //     this.offsetX = target.transform.x;
        //     this.offsetY = target.transform.y;
        // }
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
    
        // 좌표를 scale에 맞춰 변환 (중요!)
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
}

export default Camera;