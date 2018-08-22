var globalConfig = {
    map_width: 0,
    map_height: 0,
    zoom_step: 0,
    map_pos_x: 0,
    map_pos_y: 0
};

window.addEventListener('resize', function() {

    ctx = getCtx();

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    globalConfig.map_pos_x = window.innerWidth/2;
    globalConfig.map_pos_y = window.innerHeight/2;

    drawMap();
});

function drawMap() {

    clearCanvas();

    var ctx = getCtx();

    ctx.fillStyle = 'green';
    ctx.fillRect(
        globalConfig.map_pos_x - globalConfig.map_width/2,
        globalConfig.map_pos_y - globalConfig.map_height/2,
        globalConfig.map_width,
        globalConfig.map_height);
}

function getCtx(){
    var c = document.getElementById("main_canvas");
    return c.getContext("2d");
}

/* Init & Bind Event Listeners */
document.addEventListener("DOMContentLoaded", function(event) {
    
    globalConfig = {
        map_width: 100,
        map_height: 100,
        zoom_step: 1.25,
        map_pos_x: window.innerWidth/2,
        map_pos_y: window.innerHeight/2
    };

    ctx = getCtx();
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var zoomButtons = document.getElementsByClassName('zoom');
    for (var i = 0; i < zoomButtons.length; i++) {
        zoomButtons[i].addEventListener('click', zoomClickHandler);
    };

    var zoomFull = document.getElementsByClassName('zoom_full');
    zoomFull[0].addEventListener('click', zoomFullHandler);

    var canvas = document.getElementById("main_canvas");
    canvas.addEventListener('drag', dragCanvasHandler);

    drawMap();
});

function clearCanvas() {
    var ctx = getCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function zoomClickHandler(event) {
    var zoomIn = hasClass(event.target, 'zoom_in');

    if (zoomIn) {
        globalConfig.map_width *= globalConfig.zoom_step;
        globalConfig.map_height *= globalConfig.zoom_step;
    }
    else {
        globalConfig.map_width /= globalConfig.zoom_step;
        globalConfig.map_height /= globalConfig.zoom_step;
    }

    drawMap();
}

function zoomFullHandler(event) {
    var mod = window.innerHeight / globalConfig.map_height;

    globalConfig.map_height = window.innerHeight;
    globalConfig.map_width *= mod;
    drawMap();
}

function dragCanvasHandler(event) {

}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}