class Transform {
    static Pivot = Object.freeze({
        CENTER: "center",
        TOP_LEFT: "top-left"
    });

    constructor(x, y, pivot = Transform.Pivot.CENTER) {
        this.x = x;
        this.y = y;
        this.pivot = pivot; // 피벗 설정
    }

    setTransform(x, y) {
        this.x = x;
        this.y = y;
    }

    getTransform() {
        return { x: this.x, y: this.y };
    }
}

export default Transform;