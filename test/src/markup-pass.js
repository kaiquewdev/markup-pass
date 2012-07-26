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

        interpreterStructure: function ( settings ) {
            var output = {
                content: {}
            },
            target;

            if ( settings && settings['target'] ) {
                target = settings['target'];

                var el = {
                    attr: target.attributes,
                    type: target.tagName.toLowerCase(),
                    text: target.innerText
                };

                if ( el.attr.length > 0 ) {
                    output['content']['attrs'] = {};

                    for ( var i = 0, len = el.attr.length; i < len; i++ ) {
                        output['content']['attrs'][ el.attr[ i ]['name'] ] = el.attr[ i ]['value'];
                    }
                } if ( el.type && el.type !== 'div' ) {
                    output['content']['type'] = el.type;
                } if ( target.childNodes.length === 1 && target.childNodes[0].tagName === undefined ) {
                    output['content']['content'] = {
                        text: el.text
                    };
                }
            }

            return output;
        },

        extractFormat: function ( settings ) {
            var self = this,
                output = [],
                levels = {
                    'index': [],
                    'child': []
                },
                target;

            var extraction = function () {
            };

            if ( settings && settings['target'] ) {
                target = self.getTrack({
                    target: settings['target']
                });

                // Recursion extraction
                var i = 0,
                    len = target.length;

                while ( true ) {
                    var currentElement,
                        memoryElement;

                    if ( i < len ) {
                        currentElement = target[ i ];

                        var content = self.interpreterStructure({
                            target: currentElement
                        });

                        output[ i ] = content;

                        if ( currentElement.children.length > 0 ) {
                            var childrens = currentElement.children;

                            for ( var j = 0; j < childrens.length; j++ ) {
                                var currentChildElement = childrens[j];

                                output[ i ]['content']['content'] = ( 
                                    self.interpreterStructure({
                                        target: currentChildElement
                                    })
                                );
                            }
                        }
                    } else {
                        break;
                    }

                    i++;
                }
            }

            return output;
        },
    };

    return new core;
} ( window, document ));

window.MarkupPass = MarkupPass;
