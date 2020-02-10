class Material {
    constructor(color = new Vector, shininess = 0.0) {
        this.color = color
        this.shininess = shininess
    } 
    get() {
        return [this.color.get(), this.shininess]
    }
}