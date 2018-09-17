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

            var warpAmount = zoomIn ?
            window.app.globalConfig.zoom_step :
            (window.app.globalConfig.zoom_step * -1) + 2;

            map.setTransform(warpAmount);
            map.setTranslate(
                window.app.globalConfig.map_width * ((window.app.globalConfig.zoom_step - 1 )/ 2), 
                window.app.globalConfig.map_height * ((window.app.globalConfig.zoom_step - 1 )/ 2)
            );
            map.calculatePoints2D();
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

                    map.setTransform(yMod);
                    break;
                    
                case "x":
                    map.setTransform(xMod);
                    break;
            };

            map.setTranslate(
                window.app.globalConfig.map_width * ((window.app.globalConfig.zoom_step - 1 )/ 2), 
                window.app.globalConfig.map_height * ((window.app.globalConfig.zoom_step - 1 )/ 2)
            );

            map.draw();
        }
    }
}

export default zoom;