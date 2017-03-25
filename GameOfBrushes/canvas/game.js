function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    
    this.drawLine = function(startX, startY, endX, endY) {
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.stroke();
    }
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
