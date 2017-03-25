function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');

    var imgData = this.context.createImageData(5, 5);
    for(var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = 255; // red
        imgData.data[i+1] = 0; // green
        imgData.data[i+2] = 0; // blue
        imgData.data[i+3] = 255; // alpha
    }

    this.drawOnCanvas = function (event) {
        // Note: the canvas parameter here is the Canvas object, not the html element    
        if(paint) {
            setMousePosition(event);
            var canvasX = mouseX - this.canvas.offsetLeft;
            var canvasY = mouseY - this.canvas.offsetTop;
            this.context.putImageData(imgData, canvasX, canvasY);
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
    /* For testing purposes. Must be removed in the final program. */
    setMousePosition(event);
    
    document.getElementById('mouse').innerHTML =
        "Mouse X: " + mouseX + ", Mouse Y: " + mouseY;
}
