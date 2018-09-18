import tools from './tools.js'
import toolbar from './toolbar.js'
import sculptmode from './terrain/sculptmode.js'
import cursor from '../map/cursor.js'

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
        }
        else {
            this.setSculptMode(sculptmode.DISABLED);
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
        }
        else {
            this.setSculptMode(sculptmode.DISABLED);
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
    toggleTerrainSculpt: function() {
        // i dont know what to do here LOL
    },
}

export default terrain;