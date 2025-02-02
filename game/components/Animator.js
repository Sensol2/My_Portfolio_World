// 애니메이션 조작 컴포넌트
class Animator {
    constructor(spriteRenderer) {
        this.spriteRenderer = spriteRenderer;
        this.animations = new Map();
        this.currentAnimation = null;
        this.lastFrameTime = 0;
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
        const newAnimation = this.getAnimation(key);
        this.currentAnimation = newAnimation;
        this.spriteRenderer.changeImg(this.currentAnimation.spriteSheet); // 🔥 즉시 반영
    }

    update(timestamp) {
        if (!this.currentAnimation) return;
        const elapsed = timestamp - this.lastFrameTime;
        if (elapsed >= this.currentAnimation.frameDuration) {
            let { sx, sy, width, height } = this.currentAnimation.getFrame();
            this.spriteRenderer.changeFrame(sx, sy, width, height);
            this.currentAnimation.nextFrame();
            this.lastFrameTime = timestamp;
        }
    }
}

export default Animator;