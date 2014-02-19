'use strict';

var _ = require('../lib/proto')
    , assert = require('assert');


describe('String functions', function() {
    it('should define firstUpperCase function', function() {
        var upper = 'UPPERCASE'
            , lower = 'lowercase';

        assert.equal(_.firstUpperCase(upper), 'UPPERCASE');
        assert.equal(_.firstUpperCase(lower), 'Lowercase');
    });


    it('should define firstLowerCase function', function() {
        var upper = 'UPPERCASE'
            , lower = 'lowercase';

        assert.equal(_.firstLowerCase(upper), 'uPPERCASE');
        assert.equal(_.firstLowerCase(lower), 'lowercase');
    });


    it('should define toRegExp function', function() {
        var pattern = /ab+c/i
            , patternStr = pattern.toString();

        assert.equal(patternStr, '/ab+c/i');

        var regex = _.toRegExp(patternStr);
        assert.equal(patternStr, regex.toString());
        assert(regex instanceof RegExp);
        assert(regex.test('ABBC'));
    });


    it('should define toFunction function', function() {
        function myFunc() { return 1234; }
        var funcStr = myFunc.toString();

        assert.equal(funcStr, 'function myFunc() { return 1234; }');

        var func = _.toFunction(funcStr);
        assert.equal(funcStr, func.toString());
        assert.equal(typeof func, 'function');
        assert.equal(func(), 1234);
    });

    it('should define toQueryString function', function() {
        var params = {name: 'Jason', age: 30};

        var str = _.toQueryString(params);
        assert.equal(str, '?name=Jason&age=30');
    });

    it('should define fromQueryString function', function() {
        var str = '?name=Jason&age=30'; ;

        var params = _.fromQueryString(str);
        assert.deepEqual(params, {name: 'Jason', age: 30});
    });
});
