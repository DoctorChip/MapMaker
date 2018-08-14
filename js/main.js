var globalConfig = {
    map_width: 100,
    map_height: 100,
    zoom_step: 1.25,
};

drawMap();

window.addEventListener('resize', function() {
    drawMap();
});

function drawMap(){

    ctx = getCtx();

    mapW = globalConfig.map_width;
    mapH = globalConfig.map_height;

    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var midW = winW/2;
    var midH = winH/2;

    ctx.canvas.width = winW;
    ctx.canvas.height = winH;
    ctx.fillStyle = 'green';

    ctx.fillRect(midW - mapW/2, midH - mapH/2, mapW, mapH);
}

function getCtx(){
    var c = document.getElementById("main_canvas");
    return c.getContext("2d");
}

/* Bind Event Listeners */
document.addEventListener("DOMContentLoaded", function(event) {

    var zoomButtons = document.getElementsByClassName('zoom');
    for (var i = 0; i < zoomButtons.length; i++) {
        zoomButtons[i].addEventListener('click', zoomClickHandler);
    };

    var zoomFull = document.getElementsByClassName('zoom_full');
    zoomFull[0].addEventListener('click', zoomFullHandler);

});

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

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}