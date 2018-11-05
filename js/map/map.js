import cursor from './cursor.js'
import context from '../context.js'

var map = {

    cursor,
    points: [],
    config: {
        colors: [],
    },

    /*
     *  Initalise our data points, spread over the area.
     */
    init: function() {
        this.calculatePoints2D();
        this.loadDefaultColors();
    },

    draw: function() {
        this.clear();

        var ctx = context.getContext();
    
        ctx.fillStyle = 'green';
        ctx.fillRect(
            app.globalConfig.map_pos_x - app.globalConfig.map_width/2,
            app.globalConfig.map_pos_y - app.globalConfig.map_height/2,
            app.globalConfig.map_width,
            app.globalConfig.map_height);

        // // debug - draw points[]
        // var xOffset = app.globalConfig.map_pos_x - app.globalConfig.map_width/2;
        // var yOffset = app.globalConfig.map_pos_y - app.globalConfig.map_height/2;

        // ctx.strokeStyle = 'black';
        // for (var i = 0; i < this.points.length; i++) {
        //     var pnt = this.points[i];
        //     ctx.strokeRect(xOffset + pnt.x, yOffset + pnt.y, 1, 1);
        // }
    },

    /*
     *  Proxy through the the context method, setTransform.
     */
    setTransform: function(amount) {
        context.setTransform(amount);
    },

    setTranslate: function(x, y) {
        var ctx = context.getContext();
        ctx.translate(x, y);  
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

    /*
     *  Clears the canvas. In order to account for changes in our Transform matrix,
     *  we need to save the transform, reset it to the identity matrix, then reapply
     *  our original, saved matrixs. :)
     */
    clear: function() {
        var ctx = context.getContext();
        this.popTransform();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.pushTransform();
    },

    /*
     *  Loads a default set of colours for the terrain. Eventually this may
     *  pull from config files for certain terrain types, custom settings stored
     *  in the browser, or in user accounts.
     */
    loadDefaultColors: function() {
        this.config.colors = [
            ['#fff', '#fff', '#fff'],
            ['#fff', '#fff', '#fff'],
            ['#fff', '#fff', '#fff'],
            ['#fff', '#fff', '#fff'],
        ];
    },

    // Remove and save any applied transforms
    popTransform: function() {
        var ctx = context.getContext();
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    },

    // Restore any of our removed + saved tranaforms
    pushTransform: function() {
        var ctx = context.getContext();
        ctx.restore();
    }
};

export default map;