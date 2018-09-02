import exts from '../utils/exts.js'

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
        
            window.app.drawMap();
        }
        
        function zoomFullHandler() {
            var mod = window.innerHeight / window.app.globalConfig.map_height;
        
            window.app.globalConfig.map_pos_x = window.innerWidth / 2;
            window.app.globalConfig.map_pos_y = window.innerHeight / 2;
            window.app.globalConfig.map_height = window.innerHeight;
            window.app.globalConfig.map_width *= mod;
            window.app.drawMap();
        }
    }
}

export default zoom;