class Scene {
    constructor() {
        this.objects = [];
    }
    init() {}
    update(timestamp) {
        for (let obj of this.objects) {
            obj.update?.(timestamp);
        }
    }
    render(camera) {
        for (let obj of this.objects) {
            obj.render?.(camera);
            obj.drawDebug?.(camera);
        }
    }
    onEnter() {}
    onExit() {}
}
export default Scene;