import tools from '../tools/tools.js'
import context from '../context.js'
import exts from '../utils/exts.js'
import map from '../map/map.js'

var cursors = [
    { 
        name: 'NONE', 
        tool: tools.NONE,
        config: {
            index: 0,
            image: "img/cursor/none",
            color: "#fff"
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
            image: "img/cursor/zoom.svg",
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
        var cursorConfig = filteredCursors[0].config;
        this.bindCursor(cursorConfig);
    },

    /*
     *  Draws the cursor on the mouse.
     */
    bindCursor: function(config) {

        var canvas =  context.getCanvas();
        exts.addClass(canvas, 'tool-active');

        window.addEventListener('mousemove', function(e) {
            var x = e.pageX - 10;
            var y = e.pageY - 30;
            var scale = 50;
            var ctx = context.getContext();
            
            map.clear();
            

            var img = exts.loadSvg(config.image);
            img.onload = function() {
                ctx.drawImage(img, x, y, scale, scale);
            };
            map.draw();
        });
    },

    /*
     *  Removes any cursors.
     */
    unbindCursor: function() {
        
        var canvas =  context.getCanvas();
        exts.removeClass(canvas, 'tool-active');
    }
};

export default cursor;