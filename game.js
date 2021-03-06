function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 5;
    this.context.strokeStyle = "#FF0000";

    var began = false;
    this.drawOnCanvas = function (master, event) {
        // Note: the canvas parameter here is the Canvas object, not the html element    
        if(paint) {
            // calculate the new position
            setMousePosition(event);
            var canvasX = mouseX - master.canvas.offsetLeft;
            var canvasY = mouseY - master.canvas.offsetTop;
            
            if(!began) {
                // begin a new line if there isn't a previous position
                // gets executed only once: on mouse click
                master.context.beginPath();
                master.context.moveTo(canvasX, canvasY);
                began = true;
            }

            // finish the previus line
            master.context.lineTo(canvasX, canvasY);
            master.context.stroke();
            // begin the new line
            master.context.beginPath();
            master.context.moveTo(canvasX, canvasY);
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

function Randomizer(timeDelta) {        
    this.timeDelta = timeDelta; // in miliseconds

    this.start = function(master) {
        master.randColInt = setInterval(master.randomizeColor, master.timeDelta);
    }

    this.end = function(master) {
        clearInterval(master.randColInt);
    }

    this.randomizeColor = function(master) {
        /* Generate three random numbers (0-255) and convert them to hexadecimal */
        var red = Math.round(Math.random() * 255).toString(16);
        var green = Math.round(Math.random() * 255).toString(16);
        var blue = Math.round(Math.random() * 255).toString(16);
        
        console.log(red, red.length, parseInt(red, 16));
        console.log(green, green.length, parseInt(green, 16));
        console.log(blue, blue.length, parseInt(blue, 16));
        
        // generate the final color (in hexadecimal)
        var colors = [red, green, blue];
        var color = "#";
        for(var i = 0; i < colors.length; i++) {
            if(colors[i].length == 1) {
                colors[i] = "0" + colors[i]
            }
            color += colors[i];
        }
        console.log(color);
    }
}
            