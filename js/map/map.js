var map = {

    points: [],

    /*
     *  Initalise our data points, spread over the area.
     */
    init: function() {
        this.calculatePoints2D();
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

        var xOffset = app.globalConfig.map_pos_x - app.globalConfig.map_width/2;
        var yOffset = app.globalConfig.map_pos_y - app.globalConfig.map_height/2;

        for (var i = 0; i < this.points.length; i++) {
            ctx.strokeStyle = 'black';
            var pnt = this.points[i];
            ctx.strokeRect(xOffset + pnt.x, yOffset + pnt.y, 1, 1);
        }
    },

    /*
     *  Sets the transformation matrix to allow easy rendering of elements onto the canvas
     *  to account for zooming.
     */
    setTransformAmount(amount) {
        var ctx = window.app.context;
        ctx.transform(amount, amount, 0, 1, 1, 1);
    },

    /*
     *  Initally draw the points on the canvas.
     */
    calculatePoints2D: function() {

        var resolution = window.app.globalConfig.tools.terrain.point_resolution;
        var mapH = window.app.globalConfig.map_height;
        var mapW = window.app.globalConfig.map_width;
        var xPoints = mapW / resolution;
        var yPoints = mapH / resolution;
        
        for (var x = 1; x < xPoints; x++) {
            for (var y = 1; y < yPoints; y++) {
                this.points.push({
                    x: x * resolution,
                    y: y * resolution,
                    z: 0,
                });
            }
        }
    },

    clear: function() {
        var ctx = window.app.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
};

export default map;