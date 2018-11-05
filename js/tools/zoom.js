import exts from '../utils/exts.js'
import map from '../map/map.js'
import logger from '../logger.js'
import context from '../context.js'

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
            
            logger.print("Zooming by: " + warpAmount);
            map.setTransform(warpAmount);

            zoomIn ?
                // I do not understand these numbers.
                // When zooming in, translate by 66.66, 66.66
                // When zooming out, 100, 100.
                map.setTranslate(-(200/3), -(200/3)) :
                map.setTranslate(100, 100);

            map.calculatePoints2D();
            map.draw();
        }
        
        // Handles maximising the zoom to fit the canvas to the screen.
        function zoomFullHandler() {

            var modAxis = window.app.globalConfig.map_width <= 
                          window.app.globalConfig.map_height ? "x" : "y";

            var currentTransform = context.getTransform();

            logger.print("Zooming to full size. Detected axis to snap to: " + 
                         modAxis + ". Transforming: " + 1/currentTransform);

            context.setTransform(1/currentTransform);

             map.setTranslate(
                 window.app.globalConfig.map_width * ((window.app.globalConfig.zoom_step - 1 )/ 2), 
                 window.app.globalConfig.map_height * ((window.app.globalConfig.zoom_step - 1 )/ 2)
             );

            map.draw();
        }
    }
}

export default zoom;