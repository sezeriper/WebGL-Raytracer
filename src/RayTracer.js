class RayTracer {
    constructor(canvas) {
        this.canvas = canvas
        this.gl = canvas.getContext("webgl2")

        if (this.gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

        let vertexShader = this.createShader(vertexSource, this.gl.VERTEX_SHADER)
        let fragmentShader = this.createShader(fragmentSource, this.gl.FRAGMENT_SHADER)
        
        let shaderProgram = this.gl.createProgram()
        this.gl.attachShader(shaderProgram, vertexShader)
        this.gl.attachShader(shaderProgram, fragmentShader)
        this.gl.linkProgram(shaderProgram)
        this.gl.useProgram(shaderProgram)
        
        this.uniformWindowSize = this.gl.getUniformLocation(shaderProgram, "windowSize")
        this.gl.uniform2f(this.uniformWindowSize, this.canvas.width, this.canvas.height)
        
        this.uniformCameraMat = this.gl.getUniformLocation(shaderProgram, "cameraMat")
        this.cameraMat = new Matrix3x3
        this.gl.uniformMatrix3fv(this.uniformCameraMat, false, new Float32Array(this.cameraMat.get()))
        
        this.uniformCameraPos = this.gl.getUniformLocation(shaderProgram, "cameraPos")
        this.cameraPos = new Vector
        this.gl.uniform3f(this.uniformCameraPos, this.cameraPos.x, this.cameraPos.y, this.cameraPos.z)

        this.vertices = new Float32Array([
            -1.0, -1.0,
            -1.0,  1.0,
            1.0,  1.0,
            1.0, -1.0
        ])
        
        this.vertexBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW)
        
        let aPosition = this.gl.getAttribLocation(shaderProgram, "aPosition")
        this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.enableVertexAttribArray(aPosition)

        window.tracer = this
    }
    
    static draw(self) {
        self.resize()

        self.gl.uniformMatrix3fv(self.uniformCameraMat, false, new Float32Array(self.cameraMat.get()))
        self.gl.uniform3f(self.uniformCameraPos, self.cameraPos.x, self.cameraPos.y, self.cameraPos.z)

        self.gl.clear(self.gl.COLOR_BUFFER_BIT)

        self.gl.drawArrays(self.gl.TRIANGLE_STRIP, 0, 4)
    }
    
    uploadScene(scene) {
        this.uniformBuffer = this.gl.createBuffer()
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.uniformBuffer)
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, new Float32Array(scene.flat(Infinity)), this.gl.STATIC_DRAW)
    }

    resize() {
        this.canvas.width = canvas.clientWidth
        this.canvas.height = canvas.clientHeight
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        this.gl.uniform2f(this.uniformWindowSize, this.canvas.width, this.canvas.height)
    }
    
    createShader (sourceCode, type) {
        var shader = this.gl.createShader(type)
        this.gl.shaderSource(shader, sourceCode)
        this.gl.compileShader(shader)
    
        if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            var info = this.gl.getShaderInfoLog(shader)
            throw 'Could not compile WebGL program. \n\n' + info
        }
        
        return shader
    }
}