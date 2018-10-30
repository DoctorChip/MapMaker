import exts from './utils/exts.js'

var logger = {

    init : function() {
        if(window.app.debug) {
            var logger = document.getElementById("log_container");
            exts.removeClass(logger, "hidden");
        }
    },

    print : function(logMessage){
        if (window.app.debug){
            var logger = document.getElementById("log_container");

            // Add new Log
            
            var d = new Date();
            var ts = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}] `;

            var newLog = document.createElement("P");
            var textNode = document.createTextNode(ts + logMessage);
            newLog.appendChild(textNode);
            logger.appendChild(newLog);

            // Check log count
            var count = logger.childElementCount;
            if (count > window.app.debug_log_count_limit) {
                var children = logger.childNodes;
                children.item(0).remove();
            }
            
            console.log(logMessage);
        }
    }
};

export default logger;