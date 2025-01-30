class Renderer {
    static render(camera, objects) {
        camera.clear();
        for (const obj of objects) {
            obj.render(camera);
        }
    }
}

export default Renderer;
