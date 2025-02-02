import GameObject from "/game/objects/GameObject.js";
import elt from "/game/utils/elt.js";
/* 
==== camera.js =====
화면 렌더링, 카메라 이동 등 View 를 책임지고 관리하는 역할의 파일이다.
canvas를 생성하는 등 책임 범위가 크다. 확장 시 주의하도록 하자.
*/ 

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;
const SCALE_FACTOR = 1.1;

class Camera extends GameObject{
    constructor(_offsetX=0, _offsetY=0, _scale=2.0) {
        super(_offsetX, _offsetY);
        const [canvas, ctx] = this.createCanvas();
        this.canvas = canvas;
        this.ctx = ctx;
        this.offsetX = _offsetX;
        this.offsetY = _offsetY;
        this.scale = _scale;
    }

    update() {

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
        // 이미지 스무딩 비활성화
        this.ctx.imageSmoothingEnabled = false;

        // 기본 크기 조정 값
        const scaleX = img.width * this.scale;
        const scaleY = img.height * this.scale;
        const offsetX = x + this.offsetX;
        const offsetY = y + this.offsetY;

        // 잘라낼 영역이 지정되지 않았다면 기본 이미지 그리기
        if (sx === null || sy === null || sWidth === null || sHeight === null) {
            this.ctx.drawImage(img, offsetX, offsetY, scaleX, scaleY);
        } else {
            // 잘라낼 영역이 지정되었다면 소스 이미지에서 잘라서 그리기
            this.ctx.drawImage(
                img,          // 이미지 객체
                sx, sy,       // 잘라낼 소스 이미지의 시작 좌표
                sWidth, sHeight, // 잘라낼 영역의 크기
                offsetX, offsetY, // 화면에 그릴 위치
                sWidth * this.scale,
                img.height * this.scale // 화면에 그릴 크기
            );
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

    // 카메라 이동 속도 조정 함수 (특정 비율로 이동)
    moveTo(targetX, targetY, speed = 1.0) {
        const dx = targetX - this.offsetX;
        const dy = targetY - this.offsetY;
        this.offsetX += dx * speed;
        this.offsetY += dy * speed;
    }

    // 카메라 줌 (scale 변경)
    zoom(amount) {
        this.scale *= amount;
    }
}

export default Camera;