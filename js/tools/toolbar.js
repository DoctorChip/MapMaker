import zoom from './zoom.js'
import drag from './drag.js'
import terrain from './terrain.js'
import tools from './tools.js'
import utils from '../utils/exts.js'

var toolbar = {
    
    // Register tools
    drag,
    terrain,

    // Bind all required events to toolbar UI
    bind : function() {
        zoom.init();

        window.addEventListener('mouseout', function() {
            //toolbar.disableTools();
        });
    },

    update : function() {
        var activeTool = window.app.globalConfig.tools.getActiveTool();
        this.highlight(activeTool);
    },

    disableTools: function() {
        if (app.globalConfig.tools.drag.enabled) drag.toggle();
        window.app.globalConfig.tools.setActiveTool(tools.NONE);
    },

    /*
     *  Finds all the main toolbar elements in the DOM and stored them,
     *  for faster processing later.
     *  Self-executing, as we want to find these elements and store
     *  them.
     */
    mainToolbarElements: (function() {

        // find toolbar
        var toolbar = document.getElementById('main_toolbar');
        var children = Array.from(toolbar.children);

        var childCount = children.filter(x => utils.hasClass(x, 'dropdown')).length;
        if (childCount == 0) {
            alert("0001: Something went wrong.");
            return;
        };

        var return_list = [];
        // process children
        for (var i = 0; i < childCount; i++) {
            var item = children[i];
            var itemChildren = Array.from(item.children).filter(x => utils.hasClass(x, 'dropdown-content'));
            for (var j = 0; j < itemChildren.length; j++) {
                var tools = Array.from(itemChildren[j].children);
                var flattenedTools = tools.map(tool => { return { id: tool.getAttribute('data-tool-id') , item: tool, parent: item }; });
                for (var k = 0; k < flattenedTools.length; k++) {
                    return_list.push(flattenedTools[k]);
                }
            }
        };

        // return
        return {
            items: return_list,
            getById: function(id) {
                var result = this.items.filter(x => x.id == id);
                if (result.length != 1) { alert ("0002: Something went wrong: " + result.length); return null; }
                return result[0];
            },
        };
    })(),

    /*
     *  Highlights the correct toolbar element in the UI,
     *  to allow visual feedback of which tool is active.
     */
    highlight: function(tool) {

        // todo: remove highlight. :)
        var allElements = window.app.toolbar.mainToolbarElements.items;
        for (var i = 0; i < allElements.length; i++) {
            utils.removeClass(allElements[i].item, 'tool_highlight');
            utils.removeClass(allElements[i].parent, 'toolbar_highlight');
        }

        if (tool == tools.NONE){
            return;
        };

        // Highlight tool and its parent
        var elementToHighlight = window.app.toolbar.mainToolbarElements.getById(tool);
        if (elementToHighlight !== null) {
            utils.addClass(elementToHighlight.item, 'tool_highlight');
            utils.addClass(elementToHighlight.parent, 'toolbar_highlight');
        }
    }
}

export default toolbar;