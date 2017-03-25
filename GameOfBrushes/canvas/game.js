function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');

    var id = this.context.createImageData(1, 1);
    var d = id.data;
    d[0] = 255; // red
    d[1] = 0; // green
    d[2] = 0; // blue
    d[3] = 255; // alpha

    this.drawOnCanvas = function (event) {
        // Note: the canvas parameter here is the Canvas object, not the html element    
        if(paint) {
            setMousePosition(event);
            var canvasX = mouseX - this.canvas.offsetLeft;
            var canvasY = mouseY - this.canvas.offsetTop;
            this.context.putImageData(id, canvasX, canvasY);
        }    
    }
}

var mouseX, mouseY;
function setMousePosition(event) {
    /* Set mouse coordinates */
    mouseX = event.clientX;
    mouseY = event.clientY;
}

var paint;
function drawCond(event) {
    /* Start or stop painting on click */
    if(event) {
        switch (paint) {
            case true: // stop painting
                paint = false;
                break;
        
            default: // start painting (if paint in (undefined, false))
                paint = true;
                break;
        }
    }
}

function mouseMovement(event) {
    mousePosition(event);
    
    document.getElementById('mouse').innerHTML =
        "Mouse X: " + mouseX + ", Mouse Y: " + mouseY;
}
