class Matrix3x3 {
    constructor(list = new Array(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)) {
        if(list.length > 9) throw "List is too big for 3x3 matrix"
        this.list = list;
    }

    static makeRotationMatrix(x, y, z) {
        let aroundX = new Matrix3x3([
            1.0, 0.0, 0.0,
            0.0, Math.cos(x), -Math.sin(x),
            0.0, Math.sin(x), Math.cos(x)
        ])

        let aroundY = new Matrix3x3([
            Math.cos(y), 0.0, Math.sin(y),
            0.0, 1.0, 0.0,
            -Math.sin(y), 0.0, Math.cos(y)
        ])

        let aroundZ = new Matrix3x3([
            Math.cos(z), -Math.sin(z), 0.0,
            Math.sin(z), Math.cos(z), 0.0,
            0.0, 0.0, 1.0
        ])

        return Matrix3x3.multiply(Matrix3x3.multiply(aroundX, aroundY), aroundZ)
    }

    static multiply(a, b) {
        a = a.list
        b = b.list

        let c = new Matrix3x3(new Array(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))

        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                for(let k = 0; k < 3; k++)
                    c.list[i*3+j] += a[i*3+k] * b[k*3+j]
        
        return c
    }

    get() {
        return this.list;
    }
}