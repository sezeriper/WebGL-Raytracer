class Sphere {
    constructor(origin = new Vector, radius = 1.0, material = new Material) {
        this.origin = origin
        this.radius = radius
        this.material = material
    }
    get() {
        return [this.origin.get(), this.radius, this.material.get()]
    }
}