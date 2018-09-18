import tools from '../tools/tools.js'

var cursors = [
    { 
        name: 'NONE', 
        tool: tools.NONE,
        config: {
            index: 0,
            image: "/img/cursor/none",
            color: "#fff"
        }
    },
    { 
        name: 'ZOOM', 
        tool: tools.ZOOM,
        config: {
            index: 1,
            image: "/img/cursor/zoom",
            color: "#fff"
        }
    },
    { 
        name: 'DRAG', 
        tool: tools.DRAG,
        config: {
            index: 2,
            image: "/img/cursor/drag",
            color: "#fff"
        }
    },
    { 
        name: 'PUSH', 
        tool: tools.PUSH_TERRAIN,
        config: {
            index: 3,
            image: "/img/cursor/push",
            color: "#fff"
        }
    },
    { 
        name: 'PULL',
        tool: tools.PULL_TERRAIN,
        config: {
            index: 4,
            image: "/img/cursor/pull",
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
        // todo
    },

    /*
     *  Modifies the cursor scaling by an absolute amount, 
     *  to reflect the state of various
     *  tools, such as the terrain push and pull tools.
     */
    setCursorSize: function(size) {
        // todo
    },

    /*
     *  Removes any cursors.
     */
    unbindCursor: function() {
        // todo
    }
};

export default cursor;