var map = {
    init: function() {
        console.log("init map points");
    },

    draw: function() {
        this.clear();

        var ctx = window.app.context;
    
        ctx.fillStyle = 'green';
        ctx.fillRect(
            app.globalConfig.map_pos_x - app.globalConfig.map_width/2,
            app.globalConfig.map_pos_y - app.globalConfig.map_height/2,
            app.globalConfig.map_width,
            app.globalConfig.map_height);
    },

    clear: function() {
        var ctx = window.app.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
};

export default map;