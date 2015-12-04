'use strict';

var _ = require('../lib/proto2')
    , assert = require('assert');


[require('../lib/proto'), require('../lib/proto2')].forEach(function (_) {
describe('Utility functions', function() {
    it('should define times function', function() {
        var arr = [], thisArg = {}
        _.times(4, function(i) {
            assert.equal(this, thisArg);
            arr.push(i);
        }, thisArg);

        assert.deepEqual(arr, [0, 1, 2, 3]);
    });


    it('should define times method', function() {
        var arr = [], thisArg = {}
        _(4).times(function(i) {
            assert.equal(this, thisArg);
            arr.push(i);
        }, thisArg)._();

        assert.deepEqual(arr, [0, 1, 2, 3]);
    });


    it('should define repeat function', function() {
        var arr = _.repeat({ test: 1 }, 3);
        assert.deepEqual(arr, [{ test: 1 }, { test: 1 }, { test: 1 }]);
    });


    it('should define repeat method', function() {
        var arr = _({ test: 1 }).repeat(3)._();
        assert.deepEqual(arr, [{ test: 1 }, { test: 1 }, { test: 1 }]);
    });


    it('should define tap function', function() {
        var obj = { a: 1, b: 2, c: 3 };

        var result = _.tap(obj, function(self) {
                assert.deepEqual(self, { a: 1, b: 2, c: 3 })
            });
        
        assert.deepEqual(result, { a: 1, b: 2, c: 3 });
    });


    it('should define tap method', function() {
        var obj = { a: 1, b: 2, c: 3 };

        var result = _(obj)
            .mapKeys(function(value) {
                return value * 10;
            })
            .tap(function(self) {
                assert.deepEqual(self, { a: 10, b: 20, c: 30 })
            })
            .allKeys()
            .tap(function(self) {
                assert.deepEqual(self, ['a','b','c']);
            })
            ._();
        
        assert.deepEqual(result, ['a','b','c']);
    });


    it('should define result function', function() {
        var func1 = 'test1'
            , thisArg = {};
            
        function func2() {
            assert.equal(this, thisArg);
            assert.deepEqual(_.slice(arguments), [ 'param0', 'param1' ]);
            return 'test2';
        }

        assert.equal(_.result(func1), 'test1');
        assert.equal(_.result(func2, thisArg, 'param0', 'param1'), 'test2');
    });


    it('should define identity function', function() {
        var obj = {};
        assert.equal(_.identity(obj), obj);
    });


    it('should define identity method', function() {
        var obj = {};
        assert.equal(_(obj).identity()._(), obj);
    });


    it('should define property function', function() {
        var obj = { prop1: 1, prop2: 2 }
            , p1 = _.property('prop1')
            , p2 = _.property('prop2');
        assert.equal(p1(obj), 1);
        assert.equal(p2(obj), 2);
    });


    it('should define property method', function() {
        var obj = { prop1: 1, prop2: 2 }
            , p1 = _('prop1').property()._()
            , p2 = _('prop2').property()._();
        assert.equal(p1(obj), 1);
        assert.equal(p2(obj), 2);
    });


    it('should define compareProperty function', function() {
        var arr = [
            { value: 1, label: 'a'},
            { value: 4, label: 'c'},
            { value: 3, label: 'd'},
            { value: 2, label: 'b'}
        ];

        arr.sort(_.compareProperty('value'));
        assert.deepEqual(arr, [
            { value: 1, label: 'a'},
            { value: 2, label: 'b'},
            { value: 3, label: 'd'},
            { value: 4, label: 'c'}
        ]);

        arr.sort(_.compareProperty('label'));
        assert.deepEqual(arr, [
            { value: 1, label: 'a'},
            { value: 2, label: 'b'},
            { value: 4, label: 'c'},
            { value: 3, label: 'd'}
        ]);
    });


    it('should define compareProperty method', function() {
        var arr = [
            { value: 1, label: 'a'},
            { value: 4, label: 'c'},
            { value: 3, label: 'd'},
            { value: 2, label: 'b'}
        ];

        arr.sort(_('value').compareProperty()._());
        assert.deepEqual(arr, [
            { value: 1, label: 'a'},
            { value: 2, label: 'b'},
            { value: 3, label: 'd'},
            { value: 4, label: 'c'}
        ]);

        arr.sort(_('label').compareProperty()._());
        assert.deepEqual(arr, [
            { value: 1, label: 'a'},
            { value: 2, label: 'b'},
            { value: 4, label: 'c'},
            { value: 3, label: 'd'}
        ]);
    });


    it('should define noop function', function() {
        assert.equal(_.noop(), undefined);
    });


    it('should define noop method', function() {
        assert.equal(_({yo: 'ho'}).noop()._(), undefined);
    });
});
});
