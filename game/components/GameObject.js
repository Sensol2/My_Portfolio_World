import Transform from "/game/components/Transform.js";
import SpriteRenderer from "/game/components/SpriteRenderer.js";
import MonoBehaviour from "/game/core/MonoBehaviour.js";

/* 
==== gameObject.js =====
기본적인 게임 오브젝트의 속성을 정의한다.
나중에는 Player 등 개체가 GameObject를 상속받을 예정
*/

class GameObject extends MonoBehaviour {
    constructor(x, y) {
        super();
        this.components = new Map();
        this.transform = this.addComponent(new Transform(x, y));
    }

    addComponent(component) {
        const componentName = component.constructor.name;
        this.components.set(componentName, component);
        return component;
    }

    getComponent(componentClass) {
        return this.components.get(componentClass.name);
    }

    update() {
        return
    }

    render(camera) {
        const spriteRenderer = this.getComponent(SpriteRenderer);
        
        if (spriteRenderer) {
            let posX = this.transform.x;
            let posY = this.transform.y;

            // 피벗 옵션에 따라 위치 조정
            switch (this.transform.pivot) {
                case Transform.Pivot.CENTER:
                    posX -= spriteRenderer.sWidth / 2;
                    posY -= spriteRenderer.sHeight / 2;
                    break;
                case Transform.Pivot.TOP_LEFT:
                    // 기본적으로 (x, y) 좌표는 타일의 왼쪽 위 위치이므로 변경 없음
                    break;
            }

            spriteRenderer.draw(camera, posX, posY);
        }
    }

    drawDebug(camera) { 
        return;
    }

    move(x, y) {
        this.transform.x += x;
        this.transform.y += y;
    }
}

export default GameObject;
