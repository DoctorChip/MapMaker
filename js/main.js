import context from './context.js'
import kb from './keybind.js'
import toolbar from './tools/toolbar.js'
import tools from './tools/tools.js'
import sculptmode from './tools/terrain/sculptmode.js'

var app = {

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
                    push_enabled: false,
                    pull_enabled: false,
                    sculpt_mode: sculptmode.DISABLED,
                }
            };
        })()
    },

    // Canvas
    context: context.getContext(),
    canvas: context.getCanvas(),
    
    // Functionality
    toolbar,

    // Methods
    init: function() {
   
        window.app.initalSetup();
        kb.bind();
        toolbar.bind();
        window.app.drawMap();
    },

    drawMap: function() {
        window.app.clearCanvas();

        var ctx = window.app.context;
    
        ctx.fillStyle = 'green';
        ctx.fillRect(
            app.globalConfig.map_pos_x - app.globalConfig.map_width/2,
            app.globalConfig.map_pos_y - app.globalConfig.map_height/2,
            app.globalConfig.map_width,
            app.globalConfig.map_height);
    },

    clearCanvas: function() {
        var ctx = window.app.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    initalSetup: function() {
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
        
            window.app.drawMap();
        });
    }
}

export default app;