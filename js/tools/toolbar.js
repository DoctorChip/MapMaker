import zoom from './zoom.js'
import drag from './drag.js'
import tools from './tools.js'

var toolbar = {
    
    // Register tools
    drag,

    // Bind all required events to toolbar UI
    bind : function() {
        zoom.init();

        window.addEventListener('mouseout', function() {
            //toolbar.disableTools();
        });
    },

    update : function() {
        var activeTool = window.app.globalConfig.tools.getActiveTool();
        console.log(activeTool);
    },

    disableTools: function() {
        if (app.globalConfig.tools.drag.enabled) drag.toggle();
        window.app.globalConfig.tools.setActiveTool(tools.NONE);
    }
}

export default toolbar;