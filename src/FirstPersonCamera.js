class FirstPersonCamera {
    constructor(tracer) {
        let canvas = document.querySelector("#glCanvas")
        
        canvas.requestPointerLock = canvas.requestPointerLock ||
            canvas.mozRequestPointerLock;
        
        document.exitPointerLock = document.exitPointerLock ||
            document.mozExitPointerLock;
        
        canvas.onclick = function() {
            if (document.pointerLockElement === canvas ||
                document.mozPointerLockElement === canvas)
                    document.exitPointerLock()
            else
                canvas.requestPointerLock()
            }
        
        let handleMouse = function(event) {
            document.mouseX -= event.movementX * 0.001
            document.mouseY -= event.movementY * 0.001

            document.tracer.cameraMat = 
                Matrix3x3.makeRotationMatrix(document.mouseY, document.mouseX, 0.0)
        }
        
        let lockChange = function() {
            if (document.pointerLockElement === canvas ||
                document.mozPointerLockElement === canvas) {
                
                    console.log("Mouse locked")
                    document.addEventListener("mousemove", handleMouse, false)
            }
            else {
                console.log("Mouse unlocked")
                document.removeEventListener("mousemove", handleMouse, false)
            }
        }
        
        document.addEventListener("pointerlockchange", lockChange, false)
        document.addEventListener("mozpointerlockchange", lockChange, false)
        // add tracer to document for accesing it in handleMouse callback
        document.tracer = tracer
        document.mouseX = 0.0
        document.mouseY = 0.0
    }
}