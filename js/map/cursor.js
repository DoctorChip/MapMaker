import tools from '../tools/tools.js'
import context from '../context.js'
import exts from '../utils/exts.js'
import map from '../map/map.js'
import logger from '../logger.js'

var cursors = [
    { 
        name: 'NONE', 
        tool: tools.NONE,
        config: {
            index: 0,
            image: "",
            color: ""
        }
    },
    { 
        name: 'ZOOM', 
        tool: tools.ZOOM,
        config: {
            index: 1,
            image: "img/cursor/zoom.svg",
            color: "#fff"
        }
    },
    { 
        name: 'DRAG', 
        tool: tools.DRAG,
        config: {
            index: 2,
            image: "img/cursor/drag.svg",
            color: "#fff"
        }
    },
    { 
        name: 'PUSH', 
        tool: tools.PUSH_TERRAIN,
        config: {
            index: 3,
            image: "img/cursor/push.svg",
            color: "#fff"
        }
    },
    { 
        name: 'PULL',
        tool: tools.PULL_TERRAIN,
        config: {
            index: 4,
            image: "img/cursor/pull.svg",
            color: "#fff"
        }
    },
];

var cursor = {
    /*
     *  Accepts a tool type, resolving it to a config object containing
     *  information about the correct type of cursor to display for the tool.
     */
    assignCursorForTool: function(toolMode) {

        var filteredCursors = cursors.filter(x => x.tool == toolMode);
        if (filteredCursors.length != 1) return;
        var cursor = filteredCursors[0];

        cursor.tool === tools.NONE ?
            this.unbindCursor() :
            this.bindCursor(cursor);
    },

    /*
     *  Draws the cursor on the mouse.
     */
    bindCursor: function(cursor) {

        logger.print("Binding cursor for " + cursor.tool);

        // Hide default cursor
        var canvas =  context.getCanvas();
        exts.addClass(canvas, 'tool-active');

        // Load image
        var img = exts.loadSvg(cursor.config.image);

        img.onload = function() {
            // Bind image draw to mousemove
            canvas.addEventListener('mousemove', drawImageOnMove(img));
        };
    },

    /*
     *  Removes any cursors.
     */
    unbindCursor: function() {
        logger.print("Unbinding all cursors");

        var canvas =  context.getCanvas();
        exts.removeClass(canvas, 'tool-active');
        canvas.removeEventListener('mousemove', drawImageOnMoveInner);
        map.draw();
    }
};

/*
 *  A curried function which allows us to pass in our image,
 *  access the event for the eventListener, and also name it so we can
 *  then remove it when done. The name of the EventListener will be
 *  drawImageOnMoveInner, with no parameters.
 */
var drawImageOnMoveInner;
var drawImageOnMove = function(img) {
    drawImageOnMoveInner = function(event) {
        var scale = 50;
        var x = event.pageX - scale/2;
        var y = event.pageY - scale/2;
        var ctx = context.getContext();
    
        map.draw();
        map.popTransform();
        ctx.drawImage(img, x, y, scale, scale);
        map.pushTransform();
    }
    return drawImageOnMoveInner;
};

export default cursor;