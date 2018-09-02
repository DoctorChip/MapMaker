import context from '../context.js'

var drag = {
    toggle() {
        var canvas = context.getCanvas();
        window.app.globalConfig.tools.drag.enabled = !window.app.globalConfig.tools.drag.enabled;
        if (window.app.globalConfig.tools.drag.enabled) {
            canvas.onmousedown = this.dragCanvasHandler;
            canvas.onmouseup = this.dragEndCanvasHandler;
        }
        else {
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;
        }
    },
    dragCanvasHandler(e) {
        var canvas = context.getCanvas();
        window.app.globalConfig.tools.drag.xInit = e.clientX - window.app.globalConfig.map_pos_x;
        window.app.globalConfig.tools.drag.yInit = e.clientY - window.app.globalConfig.map_pos_y;
    
        canvas.onmousemove = this.dragHandlerMoveCanvas;
    },
    dragEndCanvasHandler() {
        var ctx = context.getContext();
        ctx.canvas.onmousemove = null;
    },
    dragHandlerMoveCanvas(e) {
        var ctx = context.getContext();
        window.app.globalConfig.map_pos_x = e.pageX - window.app.globalConfig.tools.drag.xInit - ctx.canvas.offsetLeft;
        window.app.globalConfig.map_pos_y = e.pageY - window.app.globalConfig.tools.drag.yInit - ctx.canvas.offsetTop;
        window.app.drawMap();
    }
}

export default drag;