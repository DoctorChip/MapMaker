import tools from './tools.js'
import context from '../context.js'
import toolbar from './toolbar.js'
import sculptmode from './terrain/sculptmode.js'
import cursor from '../map/cursor.js'
import logger from '../logger.js'
import map from '../map/map.js'

var terrain = {
    /*
     *  Sets the terrain editting mode to either off (if currently set to PUSH) or just
     *  sets it to PUSH.
     */
    togglePush: function() {
        toolbar.disableTools();
        window.app.globalConfig.tools.terrain.pull_enabled = false;
        window.app.globalConfig.tools.terrain.push_enabled = !window.app.globalConfig.tools.terrain.push_enabled;

        if (window.app.globalConfig.tools.terrain.push_enabled) {
            window.app.globalConfig.tools.setActiveTool(tools.PUSH_TERRAIN);
            this.setSculptMode(sculptmode.PUSH);
            cursor.assignCursorForTool(tools.PUSH_TERRAIN);
            this.enableTerrainSculpt();
        }
        else {
            this.setSculptMode(sculptmode.DISABLED);
            this.removeTerrainScultHandlers();
            cursor.assignCursorForTool(tools.NONE);
        }
    },

    /*
     *  Same as toggling PUSH, but toggles PULL.
     */
    togglePull: function() {
        toolbar.disableTools();
        window.app.globalConfig.tools.terrain.push_enabled = false;
        window.app.globalConfig.tools.terrain.pull_enabled = !window.app.globalConfig.tools.terrain.pull_enabled;
        
        if (window.app.globalConfig.tools.terrain.pull_enabled) {
            window.app.globalConfig.tools.setActiveTool(tools.PULL_TERRAIN);
            this.setSculptMode(sculptmode.PULL);
            cursor.assignCursorForTool(tools.PULL_TERRAIN);
            this.enableTerrainSculpt();
        }
        else {
            this.setSculptMode(sculptmode.DISABLED);
            this.removeTerrainScultHandlers();
            cursor.assignCursorForTool(tools.NONE);
        }
    },

    /*
     *  Increases or decreases tool size, which changes how many
     *  points are hit when using the tool. Affects the PUSH and PULL tools.
     */
    modifyToolSize: function(size) {
        window.app.globalConfig.tools.terrain.point_resolution += size; 
    },

    /*
     *  Configure the sculptor to either push or pull mode.
     *  This changes the direction of the terrain movement.
     */
    setSculptMode: function(mode) {
        window.app.globalConfig.tools.terrain.sculpt_mode = mode;
    },

    /*
     * Enables/Disables the actual sculpt tool, using the mode set by setSculptMode.
     */
    enableTerrainSculpt: function() {
        var canvas = context.getCanvas();
        canvas.addEventListener('mousedown', handleSculptDown);
        canvas.addEventListener('mousemove', handleSculptMove);
        canvas.addEventListener('mouseup', handleSculptUp);
    },

    /*
     *  Clears any event handlers for the sculpt tools
     */
    removeTerrainScultHandlers: function() {
        var canvas = context.getCanvas();
        canvas.removeEventListener("handleSculptDown");
        canvas.removeEventListener("handleSculptMove");
        canvas.removeEventListener("handleSculptUp");
    },

    /*
     *  Sets the size of the brush for push or pull of terrain.
     */
    setTerrainToolSize: function(sizePixels) {
        window.app.globalConfig.tools.terrain.tool_radius = sizePixels;
        logger.print("Set sculpt tool size: " + sizePixels);
    },

    /*
     *  Returns the scuplt tool size from the global app config.
     */
    getToolSize: function(){
        return window.app.globalConfig.tools.terrain.tool_radius;
    }
};

var handleSculptDown = function() {
    window.app.globalConfig.tools.terrain.mouse_down = true;
};

var handleSculptMove = function(e) {

    if (window.app.globalConfig.tools.terrain.mouse_down === false) return;

    let x = e.x; let y = e.y;
    let r = window.app.toolbar.terrain.getToolSize();
    var points = map.getPointsWithinArea(x, y, r);
    var toolType = window.app.globalConfig.tools.terrain.sculpt_mode;

    points.forEach(e => {
            if (toolType == 1) {
                e.z -= 1;
            } else {
                e.z += 1;
            }
    });

    map.modifyPointsArray(points);
};

var handleSculptUp = function(e) {
    window.app.globalConfig.tools.terrain.mouse_down = false;
};

export default terrain;