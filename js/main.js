var app = {
    // Props
    globalConfig: {
        map_width: 500,
        map_height: 500,
        zoom_step: 1.2,
        tools: {
            drag: {
                enabled : false,
                xInit: 0,
                yInit: 0
            }
        }
    },
    // Methods
    init: function() {
        app.globalConfig.map_pos_x = window.innerWidth / 2;
        app.globalConfig.map_pos_y = window.innerHeight / 2;
    
        var ctx = getCtx();
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    
        var zoomButtons = document.getElementsByClassName('zoom');
        for (var i = 0; i < zoomButtons.length; i++) {
            zoomButtons[i].addEventListener('click', zoomClickHandler);
        };
    
        var zoomFull = document.getElementsByClassName('zoom_full');
        zoomFull[0].addEventListener('click', zoomFullHandler);
    
        drawMap();
    }
}

window.addEventListener('resize', function() {

    var ctx = getCtx();
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    globalConfig.map_pos_x = window.innerWidth/2;
    globalConfig.map_pos_y = window.innerHeight/2;

    drawMap();
});

window.addEventListener('mouseout', function() {
    disableTools();
});

function drawMap() {

    clearCanvas();

    var ctx = getCtx();

    ctx.fillStyle = 'green';
    ctx.fillRect(
        app.globalConfig.map_pos_x - app.globalConfig.map_width/2,
        app.globalConfig.map_pos_y - app.globalConfig.map_height/2,
        app.globalConfig.map_width,
        app.globalConfig.map_height);
}

function getCtx(){
    var c = document.getElementById("main_canvas");
    return c.getContext("2d");
}

function clearCanvas() {
    var ctx = getCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function disableTools() {
    if (app.globalConfig.tools.drag.enabled) toggleDrag();
}

function toggleDrag() {
    var canvas = getCtx().canvas;
    globalConfig.tools.drag.enabled = !globalConfig.tools.drag.enabled;
    if (globalConfig.tools.drag.enabled) {
        ctx.canvas.onmousedown = dragCanvasHandler;
        ctx.canvas.onmouseup = dragEndCanvasHandler;
    }
    else {
        canvas.onmousemove = null;
        ctx.canvas.onmousedown = null;
        ctx.canvas.onmouseup = null;
    }
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

    globalConfig.map_pos_x = window.innerWidth / 2;
    globalConfig.map_pos_y = window.innerHeight / 2;
    globalConfig.map_height = window.innerHeight;
    globalConfig.map_width *= mod;
    drawMap();
}

function dragCanvasHandler(e) {
    var canvas = getCtx().canvas;

    globalConfig.tools.drag.xInit = e.clientX - globalConfig.map_pos_x;
    globalConfig.tools.drag.yInit = e.clientY - globalConfig.map_pos_y;

    canvas.onmousemove = dragHandlerMoveCanvas;
}

function dragEndCanvasHandler() {
    var ctx = getCtx();
    ctx.canvas.onmousemove = null;
}

function dragHandlerMoveCanvas(e) {
    var ctx = getCtx();
    globalConfig.map_pos_x = e.pageX - globalConfig.tools.drag.xInit - ctx.canvas.offsetLeft;
    globalConfig.map_pos_y = e.pageY - globalConfig.tools.drag.yInit - ctx.canvas.offsetTop;
    drawMap();
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/////////////////
// Keybindings //
/////////////////

window.onkeyup = function(e) {
    var key = e.keyCode;
    switch (key) {
        // M
        case 77: {
            toggleDrag();
        }
    }
}

export default app;