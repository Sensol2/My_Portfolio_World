class ObjectPool {
    constructor(createFunc, initialSize = 10) {
        this.createFunc = createFunc;
        this.pool = [];
        this.activeObjects = new Set();

        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFunc());
        }
    }

    acquire() {
        const object = this.pool.length > 0 ? this.pool.pop() : this.createFunc();
        this.activeObjects.add(object);
        return object;
    }

    release(object) {
        if (!this.activeObjects.has(object)) return; // 중복 방지
        this.activeObjects.delete(object);
        object.reset(); // 객체 초기화 함수 (필요시 오버라이드 가능)
        this.pool.push(object);
    }

    getActiveObjects() {
        return Array.from(this.activeObjects);
    }
}

export default ObjectPool;
