import Transform from "/game/components/Transform.js"
import SpriteRenderer from "/game/components/SpriteRenderer.js"
import MonoBehaviour from "/game/core/MonoBehaviour.js";

/* 
==== gameObject.js =====
기본적인 게임 오브젝트의 속성을 정의한다.
나중에는 Player 등 개체가 GameObject를 상속받을 예정
*/ 

//가장 기본이 되는 클래스. 이 클래스 아래에 여러 컴포넌트들이 붙을 수 있음..
class GameObject extends MonoBehaviour{
    constructor(x,y) {
        super();
        this.components = new Map();
        this.transform = this.addComponent(new Transform(x,y))
    }

    addComponent(component) {
        const componentName = component.constructor.name;
        this.components.set(componentName, component);
        return component;
    }

    getComponent(componentClass) {
        return this.components.get(componentClass.name);
    }

    render(camera) {
        const spriteRenderer = this.getComponent(SpriteRenderer);
        
        if (spriteRenderer) {
            // 이미지 중앙을 기준으로 위치 조정 (피벗 중앙)
            const posX = this.transform.x - (spriteRenderer.sWidth / 2);
            const posY = this.transform.y - (spriteRenderer.sHeight / 2);
            spriteRenderer.draw(camera, posX, posY);
        }
    }
    
    move(x, y) {
        this.transform.x += x;
        this.transform.y += y;
    }
}

export default GameObject;
