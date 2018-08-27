var ctx = {
    getContext() {
    var c = document.getElementById("main_canvas");
    return c.getContext("2d");
    },
    getCanvas() {
        var context = this.getContext();
        return context.canvas;
    }
}

export default ctx;