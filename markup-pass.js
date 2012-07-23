// Markup pass is translator of HTML to JSON 
// @author: Kaique da Silva <kaique.developer@gmail.com>

var MarkupPass = (function ( win, doc ) { 
    var core = function () {};

    core.prototype = {
        test: function () {
            console.log('Testing ok');    
        }    
    };

    return new core;
} ( window, document ));
