class Scene {
  constructor() {
    this.objects = [];
    this.uiObjects = [];
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
      //obj.drawDebug?.(camera);
    }
  }
  drawUI(camera) {
    for (let ui of this.uiObjects) {
      ui.drawText?.(camera);
    }
  }
  onEnter() {}
  onExit() {}
}
export default Scene;
