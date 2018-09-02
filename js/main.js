import context from './context.js'
import kb from './keybind.js'
import toolbar from './tools/toolbar.js'

var app = {

    // Props
    globalConfig: {
        map_width: 500,
        map_height: 500,
        zoom_step: 1.2,
        tools: {
            drag: {
                enabled : false,
                xInit: 0,
                yInit: 0
            }
        }
    },
    
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

        var ctx = context.getContext();
    
        ctx.fillStyle = 'green';
        ctx.fillRect(
            app.globalConfig.map_pos_x - app.globalConfig.map_width/2,
            app.globalConfig.map_pos_y - app.globalConfig.map_height/2,
            app.globalConfig.map_width,
            app.globalConfig.map_height);
    },

    clearCanvas: function() {
        var ctx = context.getContext();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    initalSetup: function() {
        window.app.globalConfig.map_pos_x = window.innerWidth / 2;
        window.app.globalConfig.map_pos_y = window.innerHeight / 2;
    
        var ctx = context.getContext();
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        window.addEventListener('resize', function() {

            var ctx = context.getContext();
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            window.app.globalConfig.map_pos_x = window.innerWidth/2;
            window.app.globalConfig.map_pos_y = window.innerHeight/2;
        
            window.app.drawMap();
        });
    }
}

export default app;