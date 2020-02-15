class FirstPersonCamera {
    constructor(tracer, updateRate) {
        this.updateTime = 1000.0/updateRate

        let canvas = document.querySelector("#glCanvas")
        
        document.requestPointerLock = canvas.requestPointerLock ||
            document.mozRequestPointerLock
        
        document.exitPointerLock = document.exitPointerLock ||
            document.mozExitPointerLock
        
        canvas.onclick = function() {
            if (document.pointerLockElement === canvas ||
                document.mozPointerLockElement === canvas)
                    document.exitPointerLock()
            else
                canvas.requestPointerLock()
        }
        
        this.mouseX = 0.0
        this.mouseY = 0.0
        let handleMouse = function(event) {
            camera.mouseX -= event.movementX
            camera.mouseY -= event.movementY
        }
        
        window.keyboard = {
            keys: {},
            
            W: 87,
            A: 65,
            S: 83,
            D: 68,
            SPACE: 32,
            SHIFT: 16,
            
            isDown: function(keyCode) {
                return this.keys[keyCode];
            },
            
            onKeydown: function(event) {
                this.keys[event.keyCode] = true;
            },
            
            onKeyup: function(event) {
                delete this.keys[event.keyCode];
            }
        }
        
        this.camSpeed = 0.05
        this.mouseSens = 0.0001
        
        let update = function(self) {
            let mouseSpeed = camera.mouseSens * camera.updateTime
            tracer.cameraMat = 
                Matrix3x3.makeRotationMatrix(camera.mouseY * mouseSpeed, camera.mouseX * mouseSpeed, 0.0)

            let speed = camera.camSpeed * camera.updateTime
            let forward = Vector.transform(window.tracer.cameraMat, new Vector(0.0, 0.0, 1.0))
            forward.normalize()
            forward.mul(speed)
            
            let up = new Vector(0.0, 1.0, 0.0)
            up.normalize()
            up.mul(speed)
            
            let right = Vector.crossProduct(up, forward)
            right.normalize()
            right.mul(speed)
            
            if(keyboard.isDown(keyboard.W))
                tracer.cameraPos.add(forward)
            if(keyboard.isDown(keyboard.A))
                tracer.cameraPos.sub(right)
            if(keyboard.isDown(keyboard.S))
                tracer.cameraPos.sub(forward)
            if(keyboard.isDown(keyboard.D))
                tracer.cameraPos.add(right)
            if(keyboard.isDown(keyboard.SPACE))
                tracer.cameraPos.add(up)
            if(keyboard.isDown(keyboard.SHIFT))
                tracer.cameraPos.sub(up)
        }

        
        setInterval(update, this.updateTime)
        
        let lockChange = function() {
            if (document.pointerLockElement === canvas ||
                document.mozPointerLockElement === canvas) {
                    console.log("Mouse locked")
                    document.addEventListener("mousemove", handleMouse, false)
                    document.addEventListener("keydown", function(event) { window.keyboard.onKeydown(event) }, false)
                    document.addEventListener("keyup", function(event) { window.keyboard.onKeyup(event) }, false)
            }
            else {
                console.log("Mouse unlocked")
                document.removeEventListener("mousemove", handleMouse, false)
                document.removeEventListener("keydown", function(event) { window.keyboard.onKeydown(event) }, false)
                document.removeEventListener("keyup", function(event) { window.keyboard.onKeyup(event) }, false)
            }
        }
        
        document.addEventListener("pointerlockchange", lockChange, false)
        document.addEventListener("mozpointerlockchange", lockChange, false)

        window.camera = this
    }
}