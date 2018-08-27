import context from './context.js'
import kb from './keybind.js'

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
    
        var ctx = context.getContext();
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    
        var zoomButtons = document.getElementsByClassName('zoom');
        for (var i = 0; i < zoomButtons.length; i++) {
            zoomButtons[i].addEventListener('click', zoomClickHandler);
        };
    
        var zoomFull = document.getElementsByClassName('zoom_full');
        zoomFull[0].addEventListener('click', zoomFullHandler);
    
        kb.bind();
        drawMap();
    }
}

window.addEventListener('resize', function() {

    var ctx = context.getContext();
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

    var ctx = context.getContext();

    ctx.fillStyle = 'green';
    ctx.fillRect(
        app.globalConfig.map_pos_x - app.globalConfig.map_width/2,
        app.globalConfig.map_pos_y - app.globalConfig.map_height/2,
        app.globalConfig.map_width,
        app.globalConfig.map_height);
}

function clearCanvas() {
    var ctx = context.getContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function disableTools() {
    if (app.globalConfig.tools.drag.enabled) toggleDrag();
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

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

export default app;