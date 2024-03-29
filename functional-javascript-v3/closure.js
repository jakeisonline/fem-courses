/* # Closure

This is an exercise to practice closure.

## Instructions

1. Modify `strBuilder(..)` so that it can take a string and return back a function.

	**Note:** For purposes of this exercise, assume that `strBuilder(..)` itself is always called with a string initially.

2. For each call to a function here, if a string is passed, a function should be returned.

3. If a non-string is passed (such as passing no argument), a string value should be returned, which is the concatenation of all the passed in strings.

4. Hints:
	- You can use `typeof foo == "string"` to test if `foo` is a string.

	- Look at the test cases at the bottom of the exercise file to clarify any questions about expected behavior.

	- Ensure your function(s) are pure. Avoid mutating a closed over variable, which would be a side-effect.
*/

"use strict";

function strBuilder(str) {
  return function strConcat(newStr) {
    return typeof newStr == "string" ? strBuilder(str + newStr) : str;
  };
}

var hello = strBuilder("Hello, ");
var kyle = hello("Kyle");
var susan = hello("Susan");
var question = kyle("?")();
var greeting = susan("!")();

console.log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.");
console.log(hello() === "Hello, ");
console.log(kyle() === "Hello, Kyle");
console.log(susan() === "Hello, Susan");
console.log(question === "Hello, Kyle?");
console.log(greeting === "Hello, Susan!");
