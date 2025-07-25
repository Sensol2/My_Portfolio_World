class Text {
    constructor(text, x, y, font, color = "black") {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }


    drawText(camera) {
        camera.displayText(this.text, this.x, this.y, this.font, this.color);
    }
}

export default Text;