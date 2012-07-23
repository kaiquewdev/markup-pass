// Markup pass is translator of HTML to JSON 
// @author: Kaique da Silva <kaique.developer@gmail.com>

var MarkupPass = (function ( win, doc ) { 
    var core = function () {};

    core.prototype = {
        getRange: function ( settings ) {
            var output = [];

            if ( settings && settings['list'] ) {
                var counter = 0;
                
                while ( counter < settings['list'].length ) {
                    if ( 
                        // By index
                        ( settings['start'] > 0 ) && 
                        ( settings['end'] < settings['list'].length )
                    ) {

                        if ( 
                            ( counter >= settings['start'] ) && 
                            ( counter <= settings['end'] )
                        ) {
                            output.push( settings['list'][ counter ] );    
                        }

                    } else if ( 
                        // Left to right
                        ( settings['start'] > 0 ) && 
                        ( settings['start'] < settings['list'].length ) && 
                        ( !settings['end'] ) 
                    ) {

                        if ( 
                            ( counter >= settings['start'] ) && 
                            ( counter <= settings['list'].length ) 
                        ) {
                            output.push( settings['list'][ counter ] );    
                        }

                    } else if ( 
                        // Right to left
                        ( !settings['start'] ) && 
                        ( settings['end'] < settings['list'].length ) 
                    ) {

                        if ( 
                            ( counter > 0 ) && 
                            ( counter <= settings['end'] )
                        ) {
                            output.push( settings['list'][ counter ] );    
                        }    

                    }

                    counter += 1;    
                }
            }

            return output;
        },

        getTrack: function ( settings ) {
            var self = this, 
                output = [];

            if ( settings && settings['target'] ) {
                var childNodes = [],
                    fakeElement = document.createElement('body');
                
                // Insert target in the fake element
                fakeElement.innerHTML = settings['target'];
                
                output = fakeElement.children;
            }

            return output;
        },

        extractFormat: function ( settings ) {
            var self = this,
                output = {};

            if ( settings && settings['target'] ) {
                // Do the extraction of json
            }

            return output;
        },
    };

    return new core;
} ( window, document ));

window.MarkupPass = MarkupPass;
