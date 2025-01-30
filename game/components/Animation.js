
class Animation {
    constructor(key, path, frameCnt, frameDuration) {
        // 스프라이트 시트 관련
        this.spriteSheet = new Image();
        this.spriteSheet.src = path;
        
        this.key = key;
        this.frameCnt = frameCnt;                   // 총 프레임 개수
        this.currentFrame = 0;                      // 현재 재생중인 프레임

        this.spriteSheet.onload = () => {
            this.fWidth = this.spriteSheet.width / frameCnt;               // 프레임 한 칸의 너비
            this.fHeight = this.spriteSheet.height;                        // 프레임 한 칸의 높이
        };

        this.frameDuration = frameDuration;         // 애니메이션 틱
    }

    getFrame() {
        let sx = this.fWidth * this.currentFrame;
        let sy = 0;
        return {sx, sy, width: this.fWidth, height: this.fHeight};
    }

    nextFrame() {
        this.currentFrame += 1
        if (this.currentFrame >= this.frameCnt) this.currentFrame = this.currentFrame % this.frameCnt;
        return this.currentFrame;
    }
}

export default Animation;