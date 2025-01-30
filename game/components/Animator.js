// 애니메이션 조작 컴포넌트
class Animator {
    constructor(spriteRenderer) {
        this.spriteRenderer = spriteRenderer;
        this.animations = new Map();
        this.currentAnimation = null;
        this.intervalID = null;
    }

    addAnimation(...animations) {
        animations.forEach(animation => {
            this.animations.set(animation.key, animation);
        });
    }

    getAnimation(key) {
        return this.animations.get(key);
    }

    setAnimation(key) {
        console.log("Animation", this.getAnimation(key), "SET")
        this.currentAnimation = this.getAnimation(key);
    }

    play() {
        this.spriteRenderer.changeImg(this.currentAnimation.spriteSheet);
        this.intervalID = setInterval(() => {
            let { sx, sy, width, height } = this.currentAnimation.getFrame();
            this.spriteRenderer.changeFrame(sx, sy, width, height);
            this.currentAnimation.nextFrame();
        }, this.currentAnimation.frameDuration);
    }

    stop() {
        clearInterval(this.intervalID);
    }
}

export default Animator;