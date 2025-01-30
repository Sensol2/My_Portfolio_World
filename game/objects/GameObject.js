import Transform from "/game/components/Transform.js"
import SpriteRenderer from "/game/components/SpriteRenderer.js"

/* 
==== gameObject.js =====
기본적인 게임 오브젝트의 속성을 정의한다.
나중에는 Player 등 개체가 GameObject를 상속받을 예정
*/ 

//가장 기본이 되는 클래스. 이 클래스 아래에 여러 컴포넌트들이 붙을 수 있음..
class GameObject {
    constructor(x,y) {
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
            spriteRenderer.draw(camera, this.transform.x, this.transform.y);
        }
    }
}

export default GameObject;
