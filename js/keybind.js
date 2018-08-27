import drag from './tools/drag.js'

var kb = {
    bind() {
        window.onkeyup = function(e) {
            var key = e.keyCode;
            switch (key) {
                // M
                case 77: {
                    drag.toggle();
                }
            }
        }
    }
}

export default kb;