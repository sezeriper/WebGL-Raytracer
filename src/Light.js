class Light {
    constructor(position = new Vector, color = new Vector(1.0, 1.0, 1.0)) {
        this.position = position
        this.color = color
    }
    get() {
        return [this.position.get(), 0.0, this.color.get(), 0.0]
    }
}