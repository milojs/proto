proto
=====

ES5-compatible object manipulation library for node and modern browsers

[![Build Status](https://travis-ci.org/MailOnline/proto.png?branch=master)](https://travis-ci.org/MailOnline/proto)

Check documentation at http://mailonline.github.io/proto/


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
    
Browser: All functions are exported as properties of a global _ object.


Functions
---------

* [__Prototype functions__](http://mailonline.github.io/proto/prototype.js.html)
   * [extendProto](http://mailonline.github.io/proto/prototype.js.html#extendProto)
   * [createSubclass](http://mailonline.github.io/proto/prototype.js.html#createSubclass)
   * [makeSubclass](http://mailonline.github.io/proto/prototype.js.html#makeSubclass)

* [__Object functions__](http://mailonline.github.io/proto/object.js.html)
  * [extend](http://mailonline.github.io/proto/object.js.html#extend)
  * [clone](http://mailonline.github.io/proto/object.js.html#clone)
  * [defineProperty](http://mailonline.github.io/proto/object.js.html#defineProperty)
  * [defineProperties](http://mailonline.github.io/proto/object.js.html#defineProperties)
  * [deepExtend](http://mailonline.github.io/proto/object.js.html#deepExtend)
  * [allKeys](http://mailonline.github.io/proto/object.js.html#allKeys)
  * [keyOf](http://mailonline.github.io/proto/object.js.html#keyOf)
  * [allKeysOf](http://mailonline.github.io/proto/object.js.html#allKeysOf)
  * [eachKey](http://mailonline.github.io/proto/object.js.html#eachKey)
  * [mapKeys](http://mailonline.github.io/proto/object.js.html#mapKeys)

* [__Array functions__](http://mailonline.github.io/proto/array.js.html)
  * [appendArray](http://mailonline.github.io/proto/array.js.html#appendArray)
  * [prependArray](http://mailonline.github.io/proto/array.js.html#prependArray)
  * [toArray](http://mailonline.github.io/proto/array.js.html#toArray)
  * [object](http://mailonline.github.io/proto/array.js.html#object)
  * [mapToObject](http://mailonline.github.io/proto/array.js.html#mapToObject)

* [__Function functions__](http://mailonline.github.io/proto/function.js.html)
  * [partial](http://mailonline.github.io/proto/function.js.html#partial)
  * [memoize](http://mailonline.github.io/proto/function.js.html#memoize)

* [__String functions__](http://mailonline.github.io/proto/string.js.html)
  * [firstUpperCase](http://mailonline.github.io/proto/string.js.html#firstUpperCase)
  * [firstLowerCase](http://mailonline.github.io/proto/string.js.html#firstLowerCase)
