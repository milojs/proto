'use strict';

var _ = require('../lib/proto')
    , assert = require('assert')
    , perfTest = require('./perf');


describe('Function functions', function() {
    it('should define makeFunction function', function() {
        var myFunc = _.makeFunction('myFunc', 'a', 'b', 'c'
                                    , 'return a + b + c;');
        test(myFunc);

        myFunc = _('myFunc').makeFunction('a', 'b', 'c'
                                    , 'return a + b + c;')._();
        test(myFunc);

        function test(func) {
            assert(func instanceof Function);
            assert.doesNotThrow(func);
            assert.equal(func.name, 'myFunc');
            assert.equal(func('1_', '2_', '3_'), '1_2_3_');
        }
    });


    it('should define partial function', function() {
        function testFunc(a,b,c) {
            return a + b + c;
        }

        var testPartial = _.partial(testFunc, 'my ');
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial('partial ', 'function'));

        testPartial = _(testFunc).partial('my ')._();
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial('partial ', 'function'));

        var testPartial2 = _.partial(testFunc, 'my ', 'partial ');
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial2('function'));

        testPartial2 = _(testFunc).partial('my ', 'partial ')._();
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial2('function'));
    });


    it('should define partialRight function', function() {
        function testFunc(a,b,c) {
            return a + b + c;
        }

        var testPartial = _.partialRight(testFunc, 'function');
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial('my ', 'partial '));

        testPartial = _(testFunc).partialRight('function')._();
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial('my ', 'partial '));

        var testPartial2 = _.partialRight(testFunc, 'partial ', 'function');
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial2('my '));

        testPartial2 = _(testFunc).partialRight('partial ', 'function')._();
        assert.equal(testFunc('my ', 'partial ', 'function'),
                    testPartial2('my '));
    });


    it('should define memoize function', function() {
        var called = 0;

        function factorial(x) {
            called++;
            return x <= 0 ? 1 : x * fastFactorial(x-1);
        }

        var fastFactorial = _.memoize(factorial, undefined, 11);

            var fact10 = factorial(10);
            assert.equal(fastFactorial(10), fact10, 'should return the same result');

        called = 0;

            assert.equal(fastFactorial(10), fact10, 'should return the same result when called second time');
            assert.equal(called, 0, 'should take the value from cache without calling original function');
            assert.equal(fastFactorial(11), fact10 * 11, 'should return correct result');
            assert.equal(called, 1, 'should be called with new value');

        called = 0;

            assert.equal(fastFactorial(11), fact10 * 11, 'should return correct result');
            assert.equal(called, 0, 'should not be called with old value');

        called = 0;

            assert.equal(fastFactorial(0), 1, 'should return correct result');
            assert.equal(called, 1, 'should be called again as the first key will be pushed out of cache');


        function testFunc(a, b) {
            called += 1;
            return a + b;
        }

        function hashFunc (a, b) {
            return a + b;           
        }

        var memoTestFunc = _.memoize(testFunc, hashFunc);

        var result = testFunc(10, 20);
        assert.equal(memoTestFunc(10, 20), result);

        called = 0;
            assert.equal(memoTestFunc(10, 20), result);
            assert.equal(called, 0, 'should not be called with same hash');
    });

    
    it('should allow chaining of partial and memoize', function() {
        var called = 0;

        function testFunc(a, b) {
            called++;
            return a + b;
        }

        var myFunc = _(testFunc).partial('my ').memoize()._();

            assert.equal(testFunc('my ', 'function'),
                        myFunc('function'));

        called = 0;

            assert.equal(myFunc('function'), 'my function');
            assert.equal(called, 0, 'value should be taken from cache');

        perfTest(
            function(){
                var myFunc = _(testFunc).partial('my ').memoize()._();
            },
            function() {
                var myFunc = _.partial(testFunc, 'my ')
                myFunc = _.memoize(myFunc);
            }
        );
    });


    it('should define delay function', function(done) {
        var called, args;

        function myFunc() {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _.delay(myFunc, 10, 1, 2, 3);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3]);

            called = undefined;
            args = undefined;

            _(myFunc).delay(10, 1, 2, 3, 4);
            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [1, 2, 3, 4]);
                done();
            }, 20);
        }, 20);
    });


    it('should define defer function', function(done) {
        var called, args;

        function myFunc() {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _.defer(myFunc, 1, 2, 3);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3]);

            called = args = undefined;
            _(myFunc).defer(1, 2, 3, 4);

            setTimeout(function() {
                assert.deepEqual(args, [1, 2, 3, 4]);
                done();
            }, 5);
        }, 5);
    });


    it('should define delayed function', function(done) {
        var called, args, context = {};

        function myFunc() {
            called = true;
            args = Array.prototype.slice.call(arguments);
            assert.equal(this, context);
        }

        var delayedFunc = _.delayed(myFunc, 10, 1, 2, 3);
        delayedFunc.call(context, 4, 5);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3, 4, 5]);

            called = args = undefined;
            var delayedFunc = _.delayed(myFunc, 10, 6, 7);
            delayedFunc.call(context, 8, 9);

            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [6, 7, 8, 9]);
                done();
            }, 20);
        }, 20);
    });


    it('should define deferred function', function(done) {
        var called, args, context = {};

        function myFunc() {
            called = true;
            args = Array.prototype.slice.call(arguments);
            assert.equal(this, context);
        }

        var deferredFunc = _.deferred(myFunc, 1, 2, 3);
        deferredFunc.call(context, 4, 5);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3, 4, 5]);

            var deferredFunc = _.deferred(myFunc, 6, 7);
            deferredFunc.call(context, 8, 9);

            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [6, 7, 8, 9]);
                done();
            }, 5);
        }, 5);
    });


    it('should define deferTicks function', function(done) {
        var called, args;

        function myFunc() {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _.deferTicks(myFunc, 3, 1, 2, 3);

        setTimeout(function() {
            assert.equal(called, undefined);
            assert.equal(args, undefined);
            setTimeout(function() {
                assert.equal(called, undefined);
                assert.equal(args, undefined);
                setTimeout(function() {
                    assert.equal(called, true);
                    assert.deepEqual(args, [1, 2, 3]);
                    done();
                }, 0);
            }, 0);
        }, 0);
    });


    it('should define deferTicks method', function(done) {
        var called, args;

        function myFunc() {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _(myFunc).deferTicks(3, 1, 2, 3);

        setTimeout(function() {
            assert.equal(called, undefined);
            assert.equal(args, undefined);
            setTimeout(function() {
                assert.equal(called, undefined);
                assert.equal(args, undefined);
                setTimeout(function() {
                    assert.equal(called, true);
                    assert.deepEqual(args, [1, 2, 3]);
                    done();
                }, 0);
            }, 0);
        }, 0);
    });


    it('should define delayMethod function', function(done) {
        var called, args, object = {};

        object.myFunc = function() {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _.delayMethod(object, 'myFunc', 10, 1, 2, 3);

        assert.equal(called, undefined);
        assert.equal(args, undefined);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3]);

            called = false;
            args = undefined;

            _.delayMethod(object, object.myFunc, 10, 1, 2, 3);

            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [1, 2, 3]);
                done();
            }, 20);
        }, 20);
    });


    it('should define delayMethod method', function(done) {
        var called, args, object = {};

        object.myFunc = function() {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _(object).delayMethod('myFunc', 10, 1, 2, 3);

        assert.equal(called, undefined);
        assert.equal(args, undefined);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3]);

            called = false;
            args = undefined;

            _(object).delayMethod(object.myFunc, 10, 1, 2, 3);

            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [1, 2, 3]);
                done();
            }, 20);
        }, 20);
    });


    it('should define deferMethod function', function(done) {
        var called, args, object = {};

        object.myFunc = function () {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _.deferMethod(object, 'myFunc', 1, 2, 3);

        assert.equal(called, undefined);
        assert.equal(args, undefined);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3]);

            called = false;
            args = undefined;

            _.deferMethod(object, object.myFunc, 1, 2, 3);

            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [1, 2, 3]);
                done();
            }, 5);
        }, 5);
    });


    it('should define deferMethod method', function(done) {
        var called, args, object = {};

        object.myFunc = function () {
            called = true;
            args = Array.prototype.slice.call(arguments);
        }

        _(object).deferMethod('myFunc', 1, 2, 3);

        assert.equal(called, undefined);
        assert.equal(args, undefined);

        setTimeout(function() {
            assert.equal(called, true);
            assert.deepEqual(args, [1, 2, 3]);

            called = false;
            args = undefined;

            _(object).deferMethod(object.myFunc, 1, 2, 3);

            setTimeout(function() {
                assert.equal(called, true);
                assert.deepEqual(args, [1, 2, 3]);
                done();
            }, 5);
        }, 5);
    });


    it('should define debounce function', function(done) {
        var called = 0
            , args;

        function myFunc() {
            called++;
            args = Array.prototype.slice.call(arguments);
        }

        var myDebounced = _.debounce(myFunc, 20);

        myDebounced(1,2);
        myDebounced(3,4);
        assert.equal(called, 0);

        setTimeout(function(){
            myDebounced(5,6);
            assert.equal(called, 0);

            setTimeout(function() {
                assert.equal(called, 1);
                assert.deepEqual(args, [5, 6]);

                setTimeout(function() {
                    assert.equal(called, 1);
                    assert.deepEqual(args, [5, 6]);
                    done();
                }, 10)
            }, 22);
        }, 5);
    });


    it('should define debounce method', function(done) {
        var called = 0
            , args;

        function myFunc() {
            called++;
            args = Array.prototype.slice.call(arguments);
        }

        var myDebounced = _(myFunc).debounce(20)._();

        myDebounced(1,2);
        myDebounced(3,4);
        assert.equal(called, 0);

        setTimeout(function(){
            myDebounced(5,6);
            assert.equal(called, 0);

            setTimeout(function() {
                assert.equal(called, 1);
                assert.deepEqual(args, [5, 6]);

                setTimeout(function() {
                    assert.equal(called, 1);
                    assert.deepEqual(args, [5, 6]);
                    done();
                }, 10)
            }, 22);
        }, 5);
    });


    it('should define debounce function with immediate', function(done) {
        var called = 0
            , args;

        function myFunc() {
            called++;
            args = Array.prototype.slice.call(arguments);
        }

        var myDebounced = _.debounce(myFunc, 20, true);

        myDebounced(1,2);
        assert.equal(called, 1);
        assert.deepEqual(args, [1, 2]);

        myDebounced(3,4);
        assert.equal(called, 1);
        assert.deepEqual(args, [1, 2]);

        setTimeout(function(){
            myDebounced(5,6);
            assert.equal(called, 1);
            assert.deepEqual(args, [1, 2]);

            setTimeout(function() {
                myDebounced(7,8);
                assert.equal(called, 2);
                assert.deepEqual(args, [7, 8]);

                setTimeout(function() {
                    myDebounced(9,10);
                    assert.equal(called, 2);
                    assert.deepEqual(args, [7, 8]);
                    done();
                }, 10)
            }, 22);
        }, 5);
    });


    it('should define debounce method with immediate', function(done) {
        var called = 0
            , args;

        function myFunc() {
            called++;
            args = Array.prototype.slice.call(arguments);
        }

        var myDebounced = _(myFunc).debounce(20, true)._();

        myDebounced(1,2);
        assert.equal(called, 1);
        assert.deepEqual(args, [1, 2]);

        myDebounced(3,4);
        assert.equal(called, 1);
        assert.deepEqual(args, [1, 2]);

        setTimeout(function(){
            myDebounced(5,6);
            assert.equal(called, 1);
            assert.deepEqual(args, [1, 2]);

            setTimeout(function() {
                myDebounced(7,8);
                assert.equal(called, 2);
                assert.deepEqual(args, [7, 8]);

                setTimeout(function() {
                    myDebounced(9,10);
                    assert.equal(called, 2);
                    assert.deepEqual(args, [7, 8]);
                    done();
                }, 10)
            }, 22);
        }, 5);
    });


    it('should define throttle function');
    it('should define throttle method');


    it('should define once function and method', function() {
        var called = 0;

        function myFunc() {
            called++;
        }

        var myOnce = _.once(myFunc);
        myOnce();
        myOnce();
        assert.equal(called, 1);
        
        called = 0;
        myOnce = _(myFunc).once()._();
        myOnce();
        myOnce();
        assert.equal(called, 1);
    });


    it('should define waitFor function', function(done) {
        var semaphore = 'red',
            state = 'stopped';

        function isGreen(){
            return semaphore == 'green';
        }

        function setRunning(){
            state = 'running';
        }

        _.waitFor(isGreen, setRunning, 1000);

        assert.equal(state, 'stopped');
        setTimeout(function (){
            assert.equal(state, 'stopped');
            semaphore = 'green';
            setTimeout(function (){
                assert.equal(state, 'running');
                done();
            }, 100);
        }, 200);
    });


    it('should define waitFor function 2', function(done) {
        var counter = 0;
        var timedOut = false;

        function increment(){
            counter++;
            return false;
        }

        function callback(){
            counter = "cannot pass here";
        }

        function onTimeOut(){
            timedOut = true;
        }

        _.waitFor(increment, callback, 500, onTimeOut, 50);

        setTimeout(function (){
            assert.equal(counter, 10);
            assert.equal(timedOut, true);
            done();
        }, 600);
    });


    it('should define waitFor method', function(done) {
        var semaphore = 'red',
            state = 'stopped';

        function isGreen(){
            return semaphore == 'green';
        }

        function setRunning(){
            state = 'running';
        }

        _(isGreen).waitFor(setRunning, 1000)._();

        assert.equal(state, 'stopped');
        setTimeout(function (){
            assert.equal(state, 'stopped');
            semaphore = 'green';
            setTimeout(function (){
                assert.equal(state, 'running');
                done();
            }, 100);
        }, 200);
    });


    it('should define waitFor method 2', function(done) {
        var counter = 0;
        var timedOut = false;

        function increment(){
            counter++;
            return false;
        }

        function callback(){
            counter = "cannot pass here";
        }

        function onTimeOut(){
            timedOut = true;
        }

        _(increment).waitFor(callback, 500, onTimeOut, 50)._();

        setTimeout(function (){
            assert.equal(counter, 10);
            assert.equal(timedOut, true);
            done();
        }, 600);
    });


    it('should define not function', function() {
        function odd(number) {
            return !!(number % 2);
        }

        var even = _.not(odd);

        assert.equal(odd(3), true);
        assert.equal(odd(5), true);
        assert.equal(odd(2), false);
        assert.equal(odd(4), false);

        assert.equal(even(3), false);
        assert.equal(even(5), false);
        assert.equal(even(2), true);
        assert.equal(even(4), true);
    });


    it('should define not method', function() {
        function odd(number) {
            return !!(number % 2);
        }

        var even = _(odd).not()._();

        assert.equal(odd(3), true);
        assert.equal(odd(5), true);
        assert.equal(odd(2), false);
        assert.equal(odd(4), false);

        assert.equal(even(3), false);
        assert.equal(even(5), false);
        assert.equal(even(2), true);
        assert.equal(even(4), true);
    });
});
