class SpriteRenderer {
    constructor(path) {
        this.sprite = new Image();
        this.sprite.src = path;
        
        //애니메이션 처리를 위한 값들
        this.sx = 0;
        this.sy = 0;
        this.sWidth = 0;
        this.sHeight = 0;

        this.isLoaded = false;
        
        this.sprite.onload = () => {
            this.isLoaded = true;
            this.sWidth = this.sprite.width;
            this.sHeight = this.sprite.height;
        };
    }

    changeImg(img) {
        this.sprite = img;
    }

    changeFrame(sx, sy, sWidth, sHeight) {
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
    }
    
    draw(camera, x, y) {
        if (this.isLoaded) {
            camera.displayImage(this.sprite, x, y, this.sx, this.sy, this.sWidth, this.sHeight);
        }
    }
}

export default SpriteRenderer;