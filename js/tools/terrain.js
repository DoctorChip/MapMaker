import tools from './tools.js'
import toolbar from './toolbar.js'
import sculptmode from './terrain/sculptmode.js'

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
        }
        else {
            this.setSculptMode(sculptmode.DISABLED);
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
        }
        else {
            this.setSculptMode(sculptmode.DISABLED);
        }
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