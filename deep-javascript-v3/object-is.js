/* # Polyfill for `Object.is(..)`

In this exercise, you will define a polyfill for `Object.is(..)`. No cheating
and looking it up online!

## Instructions

1. `Object.is(..)` should take two parameters.

2. It should return `true` if the passed in parameters are exactly the same
value (not just `===` -- see below!), or `false` otherwise.

3. For `NaN` testing, you can use `Number.isNaN(..)`, but first see if you can
find a way to test without usage of any utility?

4. For `-0` testing, no built-in utility exists, but here's a hint: `-Infinity`.

5. If the parameters are any other values, just test them for strict equality.

6. You cannot use the built-in `Object.is(..)` -- that's cheating!

## Polyfill Pattern

**NOTE:** Since your JS environment probably already has `Object.is(..)`, to
test your polyfill you'll have to first unconditionally define it (no `if`
guard), and then add the `if` guard when you're done.

To define a polyfill, it looks like this:

```js
if (!Object.is) {
	Object.is = function ObjectIs(..) { .. };
}
```
*/

if (!Object.is || true) {
  Object.is = (p1, p2) => {
    const isNegZero = (v) => {
      return v === 0 && (1/v) == -Infinity;
    }

    const isNaN = (v) => {
      return v !== v;
    }

    const p1NegZero = isNegZero(p1);
    const p2NegZero = isNegZero(p2);

    if (p1NegZero || p2NegZero) {
      return p1NegZero && p2NegZero;
    } else if (isNaN(p1) && isNaN(p2)) {
      return true;
    } else {
      return p1 === p2;
    }
  }
}


// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true); //
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false); //
console.log(Object.is(0, -0) === false); //
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
