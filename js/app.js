import app from './main.js';

/*
 *  The main entry pont for the application.
 *  This method is self-invoking and fires off the canvas.
 */
(function() {

    // Bind app to window
    window.app = app;

    // Fire the app
    window.app.init();

})();