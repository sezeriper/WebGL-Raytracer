class Vector {
    constructor(x = 0.0, y = 0.0 ,z = 0.0) {
        this.x = x
        this.y = y
        this.z = z
    }

    add(v) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
    }

    sub(v) {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
    }

    mul(s) {
        this.x *= s
        this.y *= s
        this.z *= s
    }

    div(s) {
        this.x /= s
        this.y /= s
        this.z /= s
    }

    static crossProduct(a, b) {
        return new Vector(
            a.y*b.z - a.z*b.y,
            a.z*b.x - a.x*b.z,
            a.x*b.y - a.y*b.x
        )
    }

    normalize() {
        let magnitude = Math.hypot(Math.hypot(this.x, this.z), this.y)
        this.div(magnitude)
    }

    static transform(matrix, vector) {
        matrix = matrix.get()
        return new Vector(
            vector.x*matrix[0] + vector.y*matrix[3] + vector.z*matrix[6],
            vector.x*matrix[1] + vector.y*matrix[4] + vector.z*matrix[7],
            vector.x*matrix[2] + vector.y*matrix[5] + vector.z*matrix[8]
        )
    }

    get() {
        return [this.x, this.y, this.z]
    }
}