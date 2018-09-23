import tools from './tools.js'
import map from '../map/map.js'
import cursor from '../map/cursor.js'

var drag = {
    
    // Called by keybindings or UI events
    toggle: function() {
        var canvas = window.app.canvas;
        window.app.globalConfig.tools.drag.enabled = !window.app.globalConfig.tools.drag.enabled;
        if (window.app.globalConfig.tools.drag.enabled) {
            canvas.onmousedown = drag.dragCanvasHandler;
            canvas.onmouseup = drag.dragEndCanvasHandler;
            window.app.globalConfig.tools.setActiveTool(tools.DRAG);
            cursor.assignCursorForTool(tools.DRAG);
        }
        else {
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;
            window.app.globalConfig.tools.setActiveTool(tools.NONE);
            cursor.assignCursorForTool(tools.NONE);
        }
    },

    // When drag enabled, and mouse-down, bind events for movement of canvas
    dragCanvasHandler: function(e) {
        var canvas = window.app.canvas;
        window.app.globalConfig.tools.drag.xInit = e.clientX - window.app.globalConfig.map_pos_x;
        window.app.globalConfig.tools.drag.yInit = e.clientY - window.app.globalConfig.map_pos_y;
    
        canvas.onmousemove = drag.dragHandlerMoveCanvas;
    },

    // On mouse-up, remove canvas-update binding
    dragEndCanvasHandler: function() {
        var ctx = window.app.context;
        ctx.canvas.onmousemove = null;
    },

    // When mouse down and moving, move canvas.
    dragHandlerMoveCanvas: function(e) {
        var ctx = window.app.context;
        window.app.globalConfig.map_pos_x = e.pageX - window.app.globalConfig.tools.drag.xInit - ctx.canvas.offsetLeft;
        window.app.globalConfig.map_pos_y = e.pageY - window.app.globalConfig.tools.drag.yInit - ctx.canvas.offsetTop;
        map.draw();
    }
}

export default drag;