import exts from '../utils/exts.js'
import map from '../map/map.js'

var zoom = {
    init: function(){
        
        var zoomButtons = document.getElementsByClassName('zoom');
        for (var i = 0; i < zoomButtons.length; i++) {
            zoomButtons[i].addEventListener('click', zoomClickHandler);
        };
    
        var zoomFull = document.getElementsByClassName('zoom_full');
        zoomFull[0].addEventListener('click', zoomFullHandler);

        function zoomClickHandler(event) {
            var zoomIn = exts.hasClass(event.target, 'zoom_in');
        
            if (zoomIn) {
                window.app.globalConfig.map_width *= window.app.globalConfig.zoom_step;
                window.app.globalConfig.map_height *= window.app.globalConfig.zoom_step;
            }
            else {
                window.app.globalConfig.map_width /= window.app.globalConfig.zoom_step;
                window.app.globalConfig.map_height /= window.app.globalConfig.zoom_step;
            }
        
            map.draw();
        }
        
        // Handles maximising the zoom to fit the canvas to the screen.
        function zoomFullHandler() {

            var yMod = window.innerHeight / window.app.globalConfig.map_height;
            var xMod = window.innerWidth / window.app.globalConfig.map_width;
            var modAxis = xMod <= yMod ? "x" : "y";

            switch (modAxis)
            {
                case "y":

                    window.app.globalConfig.map_height = window.innerHeight;
                    window.app.globalConfig.map_width *= yMod;
                    break;
                    
                case "x":
                    window.app.globalConfig.map_height *= xMod;
                    window.app.globalConfig.map_width = window.innerWidth;
                    break;
            };

            window.app.globalConfig.map_pos_x = window.innerWidth / 2;
            window.app.globalConfig.map_pos_y = window.innerHeight / 2;
            map.draw();
        }
    }
}

export default zoom;