function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');

    this.drawLine = function(startX, startY, endX, endY) {
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.stroke();
    }
}

function drawOnCanvas(canvas) {
    // Note: the canvas parameter here is the Canvas object, not the html element
    mousePosition(event);
            
    // convert the mouse coordinates on the screen to the canvas coordinates
    var coefficientX = canvas.canvas.width / Number(style.getPropertyValue('width').slice(0, 3));
    var canvasX = coefficientX * mouseX - canvas.canvas.offsetLeft / 2;
    var coefficientY = canvas.canvas.height / Number(style.getPropertyValue('height').slice(0, 3));
    var canvasY = coefficientY * mouseY - canvas.canvas.offsetTop / 2;

    canvas.context.putImageData(id, canvasX, canvasY);
}


function mousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function mouseMovement(event) {
    mousePosition(event);
    
    document.getElementById('mouse').innerHTML =
        "Mouse X: " + mouseX + ", Mouse Y: " + mouseY;
}
