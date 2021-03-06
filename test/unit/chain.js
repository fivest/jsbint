(function(){
    'use strict';

    var file = require('../util/file'),
        jsbint = require('../util/jsbint'),
        debug = require('../util/helper').debug;


    // 测试链式函数断行问题。
    exports.testChain = function( test ){
        var result = jsbint('chain.js'),
            errorPos = [
                {line:18, character:16},
                {line:33, character:23},
                {line:42, character:9},
                {line:43, character:9},
                {line:44, character:9}
            ];

        // debug(result, true);

        result = result.filter(function( error ) {
            return ~['W012', 'W015', 'W086', "W014"].indexOf( error.code );
        });
        
        // debug(result, true);

        /*result.forEach(function(error){
            console.log("{line:"+error.line+", character:"+error.character+"},");
        });
        debug(true);*/


        test.expect(errorPos.length*2+1);

        test.equal(result.length, errorPos.length, 'ok');

        result.forEach(function( error, index ) {
            var expected = errorPos[index];
            test.equal(expected.line, error.line, 'ok');
            test.equal(expected.character, error.character, 'ok');
        });

        test.done();
    }
})();