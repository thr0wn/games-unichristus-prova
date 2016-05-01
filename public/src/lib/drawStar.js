function drawStar(spikes, outerRadius, innerRadius) {
    var cx = 0, cy = 0;
    var canvas = document.createElement("canvas");
    canvas.width = outerRadius * 2;
    canvas.height = outerRadius * 2;
    var ctx = canvas.getContext("2d");
    
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.strokeSyle = "#000";
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    
    ctx.fillStyle='white';
    ctx.fill();
    return canvas;
}