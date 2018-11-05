import logger from "./logger.js";

var ctx = {

    currentTransform: 1,

    getContext() {
    var c = document.getElementById("main_canvas");
    return c.getContext("2d");
    },

    getCanvas() {
        var context = this.getContext();
        return context.canvas;
    },

    resetTransform(){

        this.currentTransform = 1;
        var context = this.getContext();
        context.setTransform(1,0,0,1,0,0);
        logger.print("Reset transform matrix.");
    },

    /*
     *  Set the transformation matrix of the Canvas. We only pass in a single parameter,
     *  as we want to change only the scale of the canvas, and change x with y.
     */
    setTransform(amount) {
        var ctx = this.getContext();
        ctx.transform(amount, 0, 0, amount, 0, 0);
        this.currentTransform *= amount;

        logger.print("Setting transform: " + amount + ". New transform: " + this.currentTransform);
    },

    getTransform() {
        return this.currentTransform;
    }
}

export default ctx;