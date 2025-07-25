/** @type { {rect1: Collider, rect2: Collider} } */
export function rectangularCollision({ rect1, rect2 }) {
  return (
    rect1.x + rect1.width >= rect2.x &&
    rect1.x <= rect2.x + rect2.width &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
}

class Collider {
    constructor(x, y, width, height) {
        this.x = x;         // 중심 x
        this.y = y;         // 중심 y
        this.width = width;
        this.height = height;
    }
}


export default Collider;

