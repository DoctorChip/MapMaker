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

        // Groups points
        var terrainGroups = calculateTerrainGroups();

        terrainGroups.forEach(g => {
            // 
        });

        // debug - draw points[]
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

    /*
     *  Proxy to setTranslate method on context.
     */
    setTranslate: function(x, y) {
        context.setTranslate(x, y);
    },

    /*
     *  Initally draw the points on the canvas.
     */
    calculatePoints2D: function() {

        var resolution = window.app.globalConfig.tools.terrain.point_resolution;
        var size = this.getPointsArraySize();
        
        for (var x = 1; x < size.X; x++) {
            for (var y = 1; y < size.Y; y++) {
                this.points.push({
                    x: x * resolution,
                    y: y * resolution,
                    z: 0,
                });
            }
        }
    },

    /*
     *  Using the size of the map and the point resolution from the settings,
     *  find the dimensions of our 2D points array. E.g., will return { X: 100, Y: 100 }.
     */
    getPointsArraySize: function() {
        var resolution = window.app.globalConfig.tools.terrain.point_resolution;
        var mapH = window.app.globalConfig.map_height;
        var mapW = window.app.globalConfig.map_width;
        var xPoints = mapW / resolution;
        var yPoints = mapH / resolution;
        return { X: xPoints, Y: yPoints };
    },

    /*
     *  Group the map points into groups, by 'island' groups, and by Z axis value.
     */
    calculateTerrainGroups: function() {

        const directions = ["UP", "DOWN", "LEFT", "RIGHT", "UPLEFT",
                            "UPRIGHT", "DOWNLEFT", "DOWNRIGHT"];

        var size = this.getPointsArraySize();
        let islands = []; // A group of adjacent points with the same Z value.
        var points = this.points;

        // Process points, finding islands
        while (points.length > 0) {

            let island = [];
            let foundNeigbour = true;

            while (foundNeigbour) {

                let neighbours = []; // get neighbours of initial point
                let neighbourBuffer = []; // A temp holding array of matching points.
                let p = points[0]; neighbours.push(p); // Take an initial point

                // Check all neighbours
                directions.forEach(direction => {

                    let p_result = findNeighbour(p, direction, points, size.X, size.Y);

                    if (p_result !== null && p_result.z === p.z){
                        neighbourBuffer.push(p_result); points.pop(p_result);
                    }
                });

                while (neighbourBuffer.length > 0){

                    var newBuffer = [];

                    neighbourBuffer.forEach(np => {
                        let p_result = findNeighbour(np, direction, points, size.X, size.Y);
                        if (p_result !== null && p_result.z === np.z){
                            newBuffer.push(p_result);
                        }
                    });

                    neighbours.push(neighbourBuffer);
                    neighbourBuffer.push(newBuffer);
                }

                if (neighbours.length === 0) {
                    foundNeigbour = false;
                }
                else {
                    island.push(neighbours); // Add neighbours to island array
                    points.pop(neighbours); // Remove neighbours
                }
            }
            
            // If non empty, push to islands array for return.
            if (island.length > 0) {
                islands.push(island);
            }
        };

        // Group islands by Z, by looking at the Z value of the first point in an island
        let Zgroups = { };
        islands.forEach(p => {
            var groupZ = Zgroups[p[0].z];
            if (groupZ) {
                groupZ.push(p);
            } else {
                Zgroups[p[0].z] = [p];
            }
        });

        /*
         *   Zgroups: { [Z:0, [...]], [Z:1, [...]], ...}
         */
        return Zgroups;
    },

    /*
     *  Returns all the points in an area, represented by an x and y coord of the centre
     *  of the area, and a radius.
     */
    getPointsWithinArea: function(x, y, r) {
        return this.points.filter(p => {
            let xd = Math.abs(p.x - x);
            let yd = Math.abs(p.y - y);
            let d = Math.sqrt(xd*xd + yd*yd);
            return d < r;
        });
    },

    /*
     *  Modifies points on the map. The passed values are represented as a (pos, val) pair,
     *  as a list.
     */
    modifyPointsArray: function(pointsArray) {
        pointsArray.forEach(i => {
            let p = this.points.filter(o => i.x == o.x && i.y == o.y)[0];
            p.z = i.z;
        });
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

var findNeighbour = function(sourcePoint, direction, source, width, height) {

    var pCount = source.length;

    let x = source.x;
    let y = source.y;

    switch (direction){
        case "UP": {
            break;
        }
        case "DOWN": {
            break;
        }
        case "LEFT": {
            break;
        }
        case "RIGHT": {
            break;
        }
        case "UPLEFT": {
            break;
        }
        case "UPRIGHT": {
            break;
        }
        case "DOWNLEFT": {
            break;
        }
        case "DOWNRIGHT": {
            break;
        }
    }
}

export default map;