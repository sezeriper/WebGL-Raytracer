class Vector {
    constructor(x = 0.0, y = 0.0 ,z = 0.0) {
        this.x = x
        this.y = y
        this.z = z
    } 
    get() {
        return [this.x, this.y, this.z]
    }
}