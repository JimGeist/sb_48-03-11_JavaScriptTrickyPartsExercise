# 48-03-11 JavaScript: Tricky Parts Exercise
Questions posted on [Topal](https://www.toptal.com/javascript/interview-questions)

## What is a potential pitfall with using `typeof bar === "object"` to determine if `bar` is an object? How can this pitfall be avoided?

**My Answer:** Everything in JavaScript is an object though scalars will return a true type -- boolean, integer, string, etc. A pitfall occurs when bar needs to be a certain object, like an array. A better test is `bar instanceof objType` where *objType* is Array, Set, Map, etc.

**Toptal**: Although typeof bar === "object" is a reliable way of checking if bar is an object, the surprising gotcha in JavaScript is that null is also considered an object!

Therefore, the following code will, to the surprise of most developers, log true (not false) to the console:

var bar = null;
console.log(typeof bar === "object");  // logs true!

As long as one is aware of this, the problem can easily be avoided by also checking if bar is null:

console.log((bar !== null) && (typeof bar === "object"));  // logs false

To be entirely thorough in our answer, there are two other things worth noting:

First, the above solution will return false if bar is a function. In most cases, this is the desired behavior, but in situations where you want to also return true for functions, you could amend the above solution to be:

console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function")));

Second, the above solution will return true if bar is an array (e.g., if var bar = [];). In most cases, this is the desired behavior, since arrays are indeed objects, but in situations where you want to also false for arrays, you could amend the above solution to be:

console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]"));

However, there’s one other alternative that returns false for nulls, arrays, and functions, but true for objects:

console.log((bar !== null) && (bar.constructor === Object));

Or, if you’re using jQuery:

console.log((bar !== null) && (typeof bar === "object") && (! $.isArray(bar)));

ES5 makes the array case quite simple, including its own null check:

console.log(Array.isArray(bar));

## What will the code below output to the console and why?
```
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```

**My Answer:**
a defined? true
b defined? true

And wrong.
**Toptal**: Since both a and b are defined within the enclosing scope of the function, and since the line they are on begins with the var keyword, most JavaScript developers would expect typeof a and typeof b to both be undefined in the above example.

However, that is not the case. The issue here is that most developers incorrectly understand the statement var a = b = 3; to be shorthand for:

var b = 3;
var a = b;

But in fact, var a = b = 3; is actually shorthand for:

b = 3;
var a = b;

As a result (if you are not using strict mode), the output of the code snippet would be:

a defined? false
b defined? true

But how can b be defined outside of the scope of the enclosing function? Well, since the statement var a = b = 3; is shorthand for the statements b = 3; and var a = b;, b ends up being a global variable (since it is not preceded by the var keyword) and is therefore still in scope even outside of the enclosing function.

Note that, in strict mode (i.e., with use strict), the statement var a = b = 3; will generate a runtime error of ReferenceError: b is not defined, thereby avoiding any headfakes/bugs that might othewise result. (Yet another prime example of why you should use use strict as a matter of course in your code!)

## What will the code below output to the console and why?
```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```

**My Answer**: 
```
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = undefined
```

**Toptal**: The above code will output the following to the console:
```
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```
In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.

In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner function, whereas the reference to the local variable self remains in scope and is accessible there.


## What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

**My Answer**: 

**Toptal**:

## What is the significance, and what are the benefits, of including `'use strict'` at the beginning of a JavaScript source file?

**My Answer**:  I am sure there is probably a ton of reasons. For me, `use strict` means the variable when used in an expression must exist. No JavaScript, don't create it for me, it needs to have a formal declaration.

**Toptal**:
The short and most important answer here is that use strict is a way to voluntarily enforce stricter parsing and error handling on your JavaScript code at runtime. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions. In general, it is a good practice.

Some of the key benefits of strict mode include:

- Makes debugging easier. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions, alerting you sooner to problems in your code and directing you more quickly to their source.
- Prevents accidental globals. Without strict mode, assigning a value to an undeclared variable automatically creates a global variable with that name. This is one of the most common errors in JavaScript. In strict mode, attempting to do so throws an error.
- Eliminates this coercion. Without strict mode, a reference to a this value of null or undefined is automatically coerced to the global. This can cause many headfakes and pull-out-your-hair kind of bugs. In strict mode, referencing a a this value of null or undefined throws an error.
- Disallows duplicate parameter values. Strict mode throws an error when it detects a duplicate named argument for a function (e.g., function foo(val1, val2, val1){}), thereby catching what is almost certainly a bug in your code that you might otherwise have wasted lots of time tracking down.
    - **Note:** It used to be (in ECMAScript 5) that strict mode would disallow duplicate property names (e.g. var object = {foo: "bar", foo: "baz"};) but as of ECMAScript 2015 this is no longer the case.
- Makes eval() safer. There are some differences in the way eval() behaves in strict mode and in non-strict mode. Most significantly, in strict mode, variables and functions declared inside of an eval() statement are not created in the containing scope (they are created in the containing scope in non-strict mode, which can also be a common source of problems).
- Throws error on invalid usage of delete. The delete operator (used to remove properties from objects) cannot be used on non-configurable properties of the object. Non-strict code will fail silently when an attempt is made to delete a non-configurable property, whereas strict mode will throw an error in such a case.

## Consider the two functions below. Will they both return the same thing? Why or why not?
```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```

**My Answer**: foo1 will return {bar: 'hello'} while foo2 will cause an error. JavaScript will interpret foo2 as
```
  return;
  {
      bar: "hello"
  };
```
A semicolon is automatically placed after return and that leaves the object with bar unassigned.

**Toptal**: Surprisingly, these two functions will not return the same thing. Rather:

console.log("foo1 returns:");
console.log(foo1());
console.log("foo2 returns:");
console.log(foo2());

will yield:

foo1 returns:
Object {bar: "hello"}
foo2 returns:
undefined 

Not only is this surprising, but what makes this particularly gnarly is that foo2() returns undefined without any error being thrown.

The reason for this has to do with the fact that semicolons are technically optional in JavaScript (although omitting them is generally really bad form). As a result, when the line containing the return statement (with nothing else on the line) is encountered in foo2(), a semicolon is automatically inserted immediately after the return statement.

No error is thrown since the remainder of the code is perfectly valid, even though it doesn’t ever get invoked or do anything (it is simply an unused code block that defines a property bar which is equal to the string "hello").

This behavior also argues for following the convention of placing an opening curly brace at the end of a line in JavaScript, rather than on the beginning of a new line. As shown here, this becomes more than just a stylistic preference in JavaScript.

## What will the code below output? Explain your answer.
```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

**My Answer**: 
```
0.3
false
```
`console.log(0.1 + 0.2);` performs an addition and the output, 0.3, is logged directly to the console.
`console.log(0.1 + 0.2 == 0.3);` is a comparison and `0.1 + 0.2` is evaluated first to 0.3. I was thinking along the lines of equivalence and deep equivalence and not floating point precision.

**Toptal**: An educated answer to this question would simply be: “You can’t be sure. it might print out 0.3 and true, or it might not. Numbers in JavaScript are all treated with floating point precision, and as such, may not always yield the expected results.”

The example provided above is classic case that demonstrates this issue. Surprisingly, it will print out:
```
0.30000000000000004
false
```
A typical solution is to compare the absolute difference between two numbers with the special constant Number.EPSILON:
```
function areTheNumbersAlmostEqual(num1, num2) {
	return Math.abs( num1 - num2 ) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));
```

## In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```

**My Answer**: 
1
4
3
2

**Toptal**: The values will be logged in the following order:
```
1
4
3
2
```
Let’s first explain the parts of this that are presumably more obvious:

- 1 and 4 are displayed first since they are logged by simple calls to console.log() without any delay

- 2 is displayed after 3 because 2 is being logged after a delay of 1000 msecs (i.e., 1 second) whereas 3 is being logged after a delay of 0 msecs.

OK, fine. But if 3 is being logged after a delay of 0 msecs, doesn’t that mean that it is being logged right away? And, if so, shouldn’t it be logged before 4, since 4 is being logged by a later line of code?

The answer has to do with properly understanding JavaScript events and timing.

The browser has an event loop which checks the event queue and processes pending events. For example, if an event happens in the background (e.g., a script onload event) while the browser is busy (e.g., processing an onclick), the event gets appended to the queue. When the onclick handler is complete, the queue is checked and the event is then handled (e.g., the onload script is executed).

Similarly, setTimeout() also puts execution of its referenced function into the event queue if the browser is busy.

When a value of zero is passed as the second argument to setTimeout(), it attempts to execute the specified function “as soon as possible”. Specifically, execution of the function is placed on the event queue to occur on the next timer tick. Note, though, that this is not immediate; the function is not executed until the next tick. That’s why in the above example, the call to console.log(4) occurs before the call to console.log(3) (since the call to console.log(3) is invoked via setTimeout, so it is slightly delayed).


## Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

**My Answer**: 
function isPalindrome(inStr) {
    if (inStr === inStr.rev)
}


**Toptal**:



**My Answer**: 

**Toptal**:



**My Answer**: 

**Toptal**:



**My Answer**: 

**Toptal**:



**My Answer**: 

**Toptal**:



**My Answer**: 

**Toptal**:

