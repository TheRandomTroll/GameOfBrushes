function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 5;
    this.context.strokeStyle = "#FF0000";

    var began = false;
    this.drawOnCanvas = function (event) {
        // Note: the canvas parameter here is the Canvas object, not the html element    
        if(paint) {
            // calculate the new position
            setMousePosition(event);
            var canvasX = mouseX - this.canvas.offsetLeft;
            var canvasY = mouseY - this.canvas.offsetTop;
            
            if(!began) {
                // begin a new line if there isn't a previous position
                // gets executed only once: on mouse click
                this.context.beginPath();
                this.context.moveTo(canvasX, canvasY);
                began = true;
            }

            // finish the previus line
            this.context.lineTo(canvasX, canvasY);
            this.context.stroke();
            // begin the new line
            this.context.beginPath();
            this.context.moveTo(canvasX, canvasY);
        }
        else began = false;
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
