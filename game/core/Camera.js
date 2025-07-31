import GameObject from "../components/GameObject.js";
import InputManager from "./InputManager.js";
import elt from "../utils/elt.js";
/* 
==== camera.js =====
화면 렌더링, 카메라 이동 등 View 를 책임지고 관리하는 역할의 파일이다.
canvas를 생성하는 등 책임 범위가 크다. 확장 시 주의하도록 하자.
*/

class Camera extends GameObject {
  constructor(cameraX = 0, cameraY = 0, _scale = 1) {
    super(cameraX, cameraY);

    // 캔버스 관련
    const [canvas, ctx] = this.createCanvas();
    this.canvas = canvas;
    this.ctx = ctx;

    // 카메라 좌표, 스케일 설정
    this.cameraX = cameraX;
    this.cameraY = cameraY;
    this.scale = _scale;
    this.targetScale = _scale;

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
      const targetX = this.target.transform.x - this.canvas.width / (2 * this.scale);
      const targetY = this.target.transform.y - this.canvas.height / (2 * this.scale);

      // t 값(0~1, 값이 작을수록 더 천천히 따라감)
      const smoothness = t;
      this.cameraX = this.lerp(this.cameraX, targetX, smoothness);
      this.cameraY = this.lerp(this.cameraY, targetY, smoothness);
    }
  }
  
  update() {
    this.scale = this.lerp(this.scale, this.targetScale, 0.1);
    if (Math.abs(this.scale - this.targetScale) > 0.001) { // 줌인/줌아웃 중일때
      this.moveCameraDoTarget(1);
    }
    else {
      this.moveCameraDoTarget(0.08);
    }
  }

  setTarget(target) {
    this.target = target;
    this.moveCameraDoTarget(1);
  }

  // 캔버스와 컨텍스트 초기화
  createCanvas() {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) {
      console.error("game-container를 찾을 수 없습니다.");
      return null;
    }

    // 컨테이너 크기에 맞게 canvas 크기 설정
    const containerWidth = gameContainer.clientWidth || window.innerWidth / 2;
    const containerHeight = gameContainer.clientHeight || window.innerHeight;

    const canvas = elt("canvas", {
      width: containerWidth,
      height: containerHeight,
    });
    
    canvas.style.display = "block";
    canvas.style.margin = "0";
    
    if (!canvas.getContext) {
      console.error("Canvas context가 지원되지 않습니다.");
      return null;
    }

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 창 크기 변경 시 canvas 크기 업데이트
    const updateCanvasSize = () => {
      const newWidth = gameContainer.clientWidth;
      const newHeight = gameContainer.clientHeight;
      
      if (newWidth && newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        // canvas 크기 변경 시 검은 배경 다시 그리기
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", updateCanvasSize);

    this.canvas = canvas;
    this.ctx = ctx;
    return [canvas, ctx];
  }

  getCanvas() {
    return [this.canvas, this.ctx];
  }

  displayImage(img, x, y, sx = null, sy = null, sWidth = null, sHeight = null) {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;

    //SRT, scale 먼저 처리 후 translate
    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(x - this.cameraX, y - this.cameraY);
    this.ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

    this.ctx.restore();
  }

  displayText(text, x, y, font = "1px Times New Roman", color = "black") {
    this.ctx.save();

    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(x - this.cameraX, y - this.cameraY);

    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }

  drawCollisionBox(rect, color = "red") {
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(rect.x - this.cameraX, rect.y - this.cameraY);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(0, 0, rect.width, rect.height);
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
    if (this.targetScale >= 3) return; // 최대 스케일 제한
    this.targetScale += 0.1;
  }

  zoomOut() {
    if (this.targetScale <= 0.9) return; // 최소 스케일 제한
    this.targetScale -= 0.1;
  }
}

export default Camera;
