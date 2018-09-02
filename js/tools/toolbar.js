import zoom from './zoom.js'
import drag from './drag.js'

var toolbar = {
    
    // Register tools
    drag,

    // Bind all required events to toolbar UI
    bind : function() {
        zoom.init();

        window.addEventListener('mouseout', function() {
            toolbar.disableTools();
        });
    },

    disableTools: function() {
        if (app.globalConfig.tools.drag.enabled) drag.toggle();
    }
}

export default toolbar;