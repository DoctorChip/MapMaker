var exts = {
    hasClass: function(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },

    removeClass: function(ele, className) {
        if (ele.className.trim() != '') {
            if (ele.className.trim().toLowerCase().indexOf(className.toLowerCase()) != -1){
                ele.className = ele.className.replace(className, '');        
            }
        }
        return;
    },

    addClass: function(ele, className) {
        if (ele.className.trim() != '') {
            if (ele.className.trim().toLowerCase().indexOf(className.toLowerCase()) != -1){
                return;
            }
        }
        ele.className = ele.className + " " + className;
    },

    loadSvg: function(path) {
        var img = new Image();
        img.src = path;
        return img;
    }
}

export default exts;