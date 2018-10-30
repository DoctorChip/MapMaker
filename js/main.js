import context from './context.js'
import kb from './keybind.js'
import toolbar from './tools/toolbar.js'
import tools from './tools/tools.js'
import sculptmode from './tools/terrain/sculptmode.js'
import map from './map/map.js'
import logger from './logger.js'

var app = {

    debug: true,
    debug_log_count_limit: 10,

    // Props
    globalConfig: {
        map_width: 1000,
        map_height: 500,
        zoom_step: 1.2,
        tools: (function() {

            // Active tool with custom setter
            var activeTool = tools.NONE;

            return {
                setActiveTool: function(tool) { 
                    activeTool = tool;
                    toolbar.update(); 
                },
                getActiveTool: function() {
                    return activeTool;
                },
                drag: {
                    enabled : false,
                    xInit: 0,
                    yInit: 0
                },
                terrain: {
                    point_resolution: 5, //px
                    push_enabled: false,
                    pull_enabled: false,
                    sculpt_mode: sculptmode.DISABLED,
                }
            };
        })()
    },

    // Functionality
    map,
    context: context.getContext(),
    canvas: context.getCanvas(),
    toolbar,

    // Methods
    init: function() {
   
        window.app.app_init();
        kb.bind();
        toolbar.bind();
        map.init();
        map.draw();
    },

    app_init: function() {

        logger.init();

        window.app.globalConfig.map_pos_x = window.innerWidth / 2;
        window.app.globalConfig.map_pos_y = window.innerHeight / 2;
    
        var ctx = window.app.context;
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        window.addEventListener('resize', function() {

            var ctx = window.app.context;
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            window.app.globalConfig.map_pos_x = window.innerWidth/2;
            window.app.globalConfig.map_pos_y = window.innerHeight/2;
        
            map.draw();
        });
    }
}

export default app;