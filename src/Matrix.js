class Matrix3x3 {
    constructor(list = new Array(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)) {
        this.list = list;
    }

    static makeRotationMatrix(x, y, z) {
        return new Matrix3x3([
            Math.cos(y), 0.0, Math.sin(y),
            0.0, 1.0, 0.0,
            -Math.sin(y), 0.0, Math.cos(y)
        ])
    }

    static multiply(a, b) {
        
    }

    get() {
        return this.list;
    }
}