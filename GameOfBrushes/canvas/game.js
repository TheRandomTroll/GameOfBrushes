// see Canvas.drawOnCanvas
var began = false;
var mouse = {};
function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 5;
    
    this.drawOnCanvas = function (master, event) {
        // Note: the canvas parameter here is the Canvas object, not the html element    
        setMousePosition(event);
        var canvasX = mouseX - master.canvas.offsetLeft;
        var canvasY = mouseY - master.canvas.offsetTop;
        
        if(!began) {
            // this code is only accessed once: when the user clicks
            // required for set-up
            mouse.startX = canvasX;
            mouse.startY = canvasY;
            
            began = true;
            return null; // the code below shouldn't be exuecuted
        }
        else {
            mouse.endX = canvasX;
            mouse.endY = canvasY;
        }
        // begin the new line
        master.context.beginPath();
        master.context.moveTo(mouse.startX, mouse.startY);

        // finish the previus line
        master.context.lineTo(mouse.endX, mouse.endY);
        master.context.stroke();

        // set up coordinates for next line
        mouse.startX = mouse.endX;
        mouse.startY = mouse.endY;
    }
        

    this.catchChange = function(master, color, width) {
        if(color) {
            master.context.strokeStyle = color;
        }
        else if(width) {
            master.context.lineWidth = width;
        }
    }
}

var mouseX, mouseY;
function setMousePosition(event) {
    /* Set mouse coordinates */
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function Randomizer(canvas, timeDelta) {
    this.canvas = canvas; // the canvas object
    this.timeDelta = timeDelta; // in miliseconds

    this.start = function(master) {
        master.randColInt = setInterval(function() { master.randomizeColor(master); }, master.timeDelta);
        master.randWidInt = setInterval(function() { master.randomizeLineWidth(master); }, master.timeDelta);
    }

    this.end = function(master) {
        clearInterval(master.randColInt);
        clearInterval(master.randWidInt);
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

        master.canvas.catchChange(master.canvas, color, undefined);
    }

    this.randomizeLineWidth = function(master) {
        /* Generate a random line width */
        var width = Math.round(Math.random() * 15 + 1);
        console.log(width);

        master.canvas.catchChange(master.canvas, undefined, width);
    }

    this.randomizeTopic = function(master, id) {
        dictionary = readDict(id);
        topic = Math.round(Math.random() * (dictionary.length - 1));
        return dictionary[topic];
    }
}

function readDict(id) {
    var dict = document.getElementById(id);
    console.log(dict.innerText.split(','));
    return dict.innerText.split(',');
}

// obsolete
function mouseMovement(event) {
    /* For testing purposes. Must be removed in the final program. */
    setMousePosition(event);
    document.getElementById('mouse').innerHTML =
        "Mouse X: " + mouseX + ", Mouse Y: " + mouseY;
}

function saveCanvToImg(canvas, id) {
    /* store canvas drawing as image */ 
    var canvasURL = canvas.toDataURL('image/octet-stream;base64');
    var img = document.getElementById(id);
    img.src = canvasURL;
}
