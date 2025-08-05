import { rectangularCollision } from "../components/Collider.js";

/**
 * 충돌 처리를 전담하는 매니저 클래스
 * 모든 게임 오브젝트의 충돌을 중앙에서 관리
 */
class CollisionManager {
    constructor() {
        this.colliders = []; // 충돌 가능한 오브젝트들
    }

    /**
     * 충돌 가능한 오브젝트 추가
     * @param {Object} collider - 충돌 처리할 오브젝트 (rect, tileCode 등 포함)
     */
    addCollider(collider) {
        this.colliders.push(collider);
    }

    /**
     * 여러 충돌체를 한번에 추가
     * @param {Array} colliders - 충돌체 배열
     */
    addColliders(colliders) {
        this.colliders.push(...colliders);
    }

    /**
     * 충돌체 제거
     * @param {Object} collider - 제거할 충돌체
     */
    removeCollider(collider) {
        const index = this.colliders.indexOf(collider);
        if (index > -1) {
            this.colliders.splice(index, 1);
        }
    }

    /**
     * 이동 가능 여부 확인 및 위치 보정
     * @param {Object} movingObject - 이동하려는 오브젝트
     * @param {number} newX - 새로운 X 좌표
     * @param {number} newY - 새로운 Y 좌표
     * @returns {Object} { canMove: boolean, correctedX: number, correctedY: number }
     */
    checkMovement(movingObject, newX, newY) {
        const prevX = movingObject.transform.x;
        const prevY = movingObject.transform.y;

        // 임시로 새 위치로 이동
        movingObject.transform.x = newX;
        movingObject.transform.y = newY;
        movingObject.updateBound?.(); // 충돌 박스 업데이트

        // 충돌 체크
        for (const collider of this.colliders) {
            if (collider === movingObject) continue; // 자기 자신과는 충돌 체크 안함

            if (this.shouldCheckCollision(movingObject, collider)) {
                if (rectangularCollision({ rect1: movingObject.rect, rect2: collider.rect })) {
                    // 충돌 발생 - 원래 위치로 복원
                    movingObject.transform.x = prevX;
                    movingObject.transform.y = prevY;
                    movingObject.updateBound?.();
                    
                    return {
                        canMove: false,
                        correctedX: prevX,
                        correctedY: prevY,
                        collidedWith: collider
                    };
                }
            }
        }

        // 충돌 없음
        return {
            canMove: true,
            correctedX: newX,
            correctedY: newY,
            collidedWith: null
        };
    }

    /**
     * 두 오브젝트 간 충돌 체크 여부 결정
     * @param {Object} obj1 - 첫 번째 오브젝트
     * @param {Object} obj2 - 두 번째 오브젝트
     * @returns {boolean} 충돌 체크 필요 여부
     */
    shouldCheckCollision(obj1, obj2) {
        // 벽 타일과의 충돌만 체크
        if (obj2.tileCode === "WALL") {
            return true;
        }
        
        // 다른 플레이어와의 충돌 (추후 확장 가능)
        // if (obj2.constructor.name === "Player") {
        //     return true;
        // }

        return false;
    }

    /**
     * 특정 위치에서 충돌하는 오브젝트 찾기
     * @param {Object} checkObject - 체크할 오브젝트
     * @param {number} x - X 좌표
     * @param {number} y - Y 좌표
     * @returns {Array} 충돌하는 오브젝트 배열
     */
    getCollisionsAt(checkObject, x, y) {
        const prevX = checkObject.transform.x;
        const prevY = checkObject.transform.y;

        // 임시로 위치 변경
        checkObject.transform.x = x;
        checkObject.transform.y = y;
        checkObject.updateBound?.();

        const collisions = [];
        for (const collider of this.colliders) {
            if (collider === checkObject) continue;

            if (this.shouldCheckCollision(checkObject, collider)) {
                if (rectangularCollision({ rect1: checkObject.rect, rect2: collider.rect })) {
                    collisions.push(collider);
                }
            }
        }

        // 원래 위치로 복원
        checkObject.transform.x = prevX;
        checkObject.transform.y = prevY;
        checkObject.updateBound?.();

        return collisions;
    }

    /**
     * 이벤트 타일과의 충돌 체크
     * @param {Object} obj - 체크할 오브젝트
     * @returns {Array} 충돌하는 이벤트 타일 배열
     */
    getEventCollisions(obj) {
        const eventCollisions = [];
        for (const collider of this.colliders) {
            if (collider.tileCode === "EVENT") {
                if (rectangularCollision({ rect1: obj.rect, rect2: collider.rect })) {
                    eventCollisions.push(collider);
                }
            }
        }
        return eventCollisions;
    }

    /**
     * 모든 충돌체 초기화
     */
    clear() {
        this.colliders = [];
    }

    /**
     * 디버그용: 현재 등록된 충돌체 수 반환
     */
    getColliderCount() {
        return this.colliders.length;
    }
}

export default CollisionManager;
