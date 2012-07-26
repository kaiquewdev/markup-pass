// Specs for markup pass
describe('Markup Pass Suite Utils tools', function () {
    it('Return a correct sequence of the input.', function () {
        var assertionRange = MarkupPass.getRange({list: 'yellow', start: 1, end: 4});
        
        expect( assertionRange ).toEqual( ['e', 'l', 'l', 'o'] );    
    });

    it('Return a empty arraya, if not receive arguments.', function () {
        var assertionRange = MarkupPass.getRange();    

        expect( assertionRange ).toEqual( [] );
    });

    it('Return n at the end of list, if only just anthor number of index.', function () {
        var assertionRange = MarkupPass.getRange({list: 'yellow', start: 1});

        expect( assertionRange ).toEqual( ['e', 'l', 'l', 'o', 'w'] );
    });

    it('Return n at the start of list, if only just another number of index.', function () {
        var assertionRange = MarkupPass.getRange({list: 'yellow', end: 3});    

        expect( assertionRange ).toEqual( ['e', 'l', 'l'] );
    });
});

describe('Markup Pass Suite Map of tags', function () {
    it('Return a list of DOM elements related to input of function', function () {
        var assertionTags = MarkupPass.getTrack({
            target: '<div><a href="http://www.google.com">Googlr</a></div>'
        });

        expect( assertionTags.length ).toEqual( 1 );
        expect( assertionTags[0].children[0].tagName ).toEqual('A');
    });    
});

describe('Markup Pass Suite JSON format interpreter', function () {
    it('Simple JSON structure', function () {
        var assertionFormat = MarkupPass.interpreterStructure({
            target: MarkupPass.getTrack({
                target: '<div class="test">testing</div>'
            })[0]
        });

        var finallyResultFormat = (function () {
            var format = {
                "content": {
                    "attrs": {
                        "class": "test"
                    },

                    "content": {
                        "text": "testing"
                    }
                }
            }

            return JSON.stringify( format );
        } ());

        expect( JSON.stringify( assertionFormat ) ).toEqual( finallyResultFormat );
    });   
});

describe('Markup Pass Suite JSON format extraction', function () {
    it('Extraction format', function () {
        var assertionFormat = MarkupPass.extractFormat({
            target: '<div class="test"><a href="http://www.google.com">google</a></div>'
        });

        var finallyResultFormat = (function () {
            var format = [{"content":{"attrs":{"class":"test"},"content":{"content":{"attrs":{"href":"http://www.google.com"},"type":"a","content":{"text":"google"}}}}}]

            return JSON.stringify( format );
        } ());

        expect( JSON.stringify( assertionFormat ) ).toEqual( finallyResultFormat );
    });
});
