import tools from './tools.js'

var terrain = {
    togglePush: function() {
        window.app.globalConfig.tools.terrain.pull_enabled = false;
        window.app.globalConfig.tools.terrain.push_enabled = !window.app.globalConfig.tools.terrain.push_enabled;
        
        if (window.app.globalConfig.tools.terrain.push_enabled) {
            window.app.globalConfig.tools.setActiveTool(tools.PUSH_TERRAIN);
        }
    },

    togglePull: function() {
        window.app.globalConfig.tools.terrain.push_enabled = false;
        window.app.globalConfig.tools.terrain.pull_enabled = !window.app.globalConfig.tools.terrain.pull_enabled;
        
        if (window.app.globalConfig.tools.terrain.pull_enabled) {
            window.app.globalConfig.tools.setActiveTool(tools.PULL_TERRAIN);
        }
    },
}

export default terrain;