proto
=====

ES5-compatible object manipulation library for node and modern browsers

[![Build Status](https://travis-ci.org/MailOnline/proto.png?branch=master)](https://travis-ci.org/MailOnline/proto)

Documentation: http://mailonline.github.io/proto/


Why not use underscore or lo-dash
---------------------------------

1. They do NOT use properties that are non-enumerable when they extend/clone/etc.
2. They DO use enumerable properties from prototypes when they extend/clone/etc.
3. When they clone, they create instances of Object rather than of the same class as cloned object.
4. They implement many methods that are already implemented natively.
5. They don't implement methods for inheritance and extention of prototypes.
6. They create confusion when you read code as you can't clearly differentiate
between arrays and objects (maps), e.g. when _each_ function is used.
7. Underscore has clumbersome chaining syntax, chaining in proto is more succinct.


Install
-------

    npm install mol-proto --save

To use and develop:

    git clone git@github.com:MailOnline/proto.git
    cd proto
    npm link
    cd ../<your project>
    npm link mol-proto


Use
---

Node/browserify:

    var _ = require('mol-proto');
    
Browser:

All functions are exported as properties of a global _ object when used with [milo](https://github.com/MailOnline/milo), there is no separate proto bundle yet (will be added shortly).


Functions
---------

* [__Prototype functions__](http://mailonline.github.io/proto/proto_prototype.js.html)
   * [extendProto](http://mailonline.github.io/proto/proto_prototype.js.html#extendProto)
   * [createSubclass](http://mailonline.github.io/proto/proto_prototype.js.html#createSubclass)
   * [makeSubclass](http://mailonline.github.io/proto/proto_prototype.js.html#makeSubclass)
   * [newApply](http://mailonline.github.io/proto/proto_prototype.js.html#newApply)


* [__Object functions__](http://mailonline.github.io/proto/proto_object.js.html)
  * [extend](http://mailonline.github.io/proto/proto_object.js.html#extend)
  * [clone](http://mailonline.github.io/proto/proto_object.js.html#clone)
  * [defineProperty](http://mailonline.github.io/proto/proto_object.js.html#defineProperty)
  * [defineProperties](http://mailonline.github.io/proto/proto_object.js.html#defineProperties)
  * [deepExtend](http://mailonline.github.io/proto/proto_object.js.html#deepExtend)
  * [deepClone](http://mailonline.github.io/proto/proto_object.js.html#deepClone)
  * [keys](http://mailonline.github.io/proto/proto_object.js.html#keys)
  * [allKeys](http://mailonline.github.io/proto/proto_object.js.html#allKeys)
  * [values](http://mailonline.github.io/proto/proto_object.js.html#values)
  * [keyOf](http://mailonline.github.io/proto/proto_object.js.html#keyOf)
  * [allKeysOf](http://mailonline.github.io/proto/proto_object.js.html#allKeysOf)
  * [eachKey](http://mailonline.github.io/proto/proto_object.js.html#eachKey)
  * [mapKeys](http://mailonline.github.io/proto/proto_object.js.html#mapKeys)
  * [reduceKeys](http://mailonline.github.io/proto/proto_object.js.html#reduceKeys)
  * [filterKeys](http://mailonline.github.io/proto/proto_object.js.html#filterKeys)
  * [someKey](http://mailonline.github.io/proto/proto_object.js.html#someKey)
  * [everyKey](http://mailonline.github.io/proto/proto_object.js.html#everyKey)
  * [findValue](http://mailonline.github.io/proto/proto_object.js.html#findValue)
  * [findKey](http://mailonline.github.io/proto/proto_object.js.html#findKey)
  * [pickKeys](http://mailonline.github.io/proto/proto_object.js.html#pickKeys)
  * [omitKeys](http://mailonline.github.io/proto/proto_object.js.html#omitKeys)
  * [isEqual](http://mailonline.github.io/proto/proto_object.js.html#isEqual)

* [__Array functions__](http://mailonline.github.io/proto/proto_array.js.html)
  * [find](http://mailonline.github.io/proto/proto_array.js.html#find)
  * [findIndex](http://mailonline.github.io/proto/proto_array.js.html#findIndex)
  * [appendArray](http://mailonline.github.io/proto/proto_array.js.html#appendArray)
  * [prependArray](http://mailonline.github.io/proto/proto_array.js.html#prependArray)
  * [spliceItem](http://mailonline.github.io/proto/proto_array.js.html/proto_array.js.html#spliceItem)
  * [toArray](http://mailonline.github.io/proto/proto_array.js.html#toArray)
  * [object](http://mailonline.github.io/proto/proto_array.js.html#object)
  * [mapToObject](http://mailonline.github.io/proto/proto_array.js.html#mapToObject)
  * [unique](http://mailonline.github.io/proto/proto_array.js.html#unique)
  * [deepForEach](http://mailonline.github.io/proto/proto_array.js.html#deepForEach)
  * Functions that Array [implements natively](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods) are also added - they can be used with array-like objects and for chaining (native functions are always called).

* [__Function functions__](http://mailonline.github.io/proto/proto_function.js.html)
  * [makeFunction](http://mailonline.github.io/proto/proto_function.js.html#makeFunction)
  * [partial](http://mailonline.github.io/proto/proto_function.js.html#partial)
  * [partialRight](http://mailonline.github.io/proto/proto_function.js.html#partialRight)
  * [memoize](http://mailonline.github.io/proto/proto_function.js.html#memoize)
  * [delay](http://mailonline.github.io/proto/proto_function.js.html#delay)
  * [defer](http://mailonline.github.io/proto/proto_function.js.html#defer)
  * [delayed](http://mailonline.github.io/proto/proto_function.js.html#delayed)
  * [deferred](http://mailonline.github.io/proto/proto_function.js.html#deferred)
  * [deferTicks](http://mailonline.github.io/proto/proto_function.js.html#deferTicks)
  * [delayMethod](http://mailonline.github.io/proto/proto_function.js.html#delayMethod)
  * [deferMethod](http://mailonline.github.io/proto/proto_function.js.html#deferMethod)
  * [debounce](http://mailonline.github.io/proto/proto_function.js.html#debounce)
  * [throttle](http://mailonline.github.io/proto/proto_function.js.html#throttle) 
  * [once](http://mailonline.github.io/proto/proto_function.js.html#once)


* [__String functions__](http://mailonline.github.io/proto/proto_string.js.html)
  * [firstUpperCase](http://mailonline.github.io/proto/proto_string.js.html#firstUpperCase)
  * [firstLowerCase](http://mailonline.github.io/proto/proto_string.js.html#firstLowerCase)
  * [toRegExp](http://mailonline.github.io/proto/proto_string.js.html#toRegExp)
  * [toFunction](http://mailonline.github.io/proto/proto_string.js.html#toFunction)
  * [toDate](http://mailonline.github.io/proto/proto_string.js.html#toDate)
  * [toQueryString](http://mailonline.github.io/proto/proto_string.js.html#toQueryString)
  * [fromQueryString](http://mailonline.github.io/proto/proto_string.js.html#fromQueryString)
  * [jsonParse](http://mailonline.github.io/proto/proto_string.js.html#jsonParse)
  * [hashCode](http://mailonline.github.io/proto/proto_string.js.html#hashCode)
  * [unPrefix](http://mailonline.github.io/proto/proto_string.js.html#unPrefix)

* [__Number functions__](http://mailonline.github.io/proto/proto_number.js.html)
  * [isNumeric](http://mailonline.github.io/proto/proto_number.js.html#isNumeric)


* [__Utility functions__](http://mailonline.github.io/proto/proto_util.js.html)
  * [times](http://mailonline.github.io/proto/proto_util.js.html#times)
  * [repeat](http://mailonline.github.io/proto/proto_util.js.html#repeat)
  * [tap](http://mailonline.github.io/proto/proto_util.js.html#tap)
  * [result](http://mailonline.github.io/proto/proto_util.js.html#result)
  * [identity](http://mailonline.github.io/proto/proto_util.js.html#identity)
