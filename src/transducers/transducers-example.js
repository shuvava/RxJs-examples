/**
 * rxjs implementation on pure js
 * https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d
 */

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const map = f => step =>
  (a, c) => step(a, f(c));
const filter = predicate => step =>
  (a, c) => predicate(c) ? step(a, c) : a;
const isEven = n => n % 2 === 0;
const double = n => n * 2;
const doubleEvens = compose(
  filter(isEven),
  map(double)
);
const arrayConcat = (a, c) => a.concat([c]);
const xform = doubleEvens(arrayConcat);
const result = [1,2,3,4,5,6].reduce(xform, []); // [4, 8, 12]
console.log(result);

// import a standard curry, or use this magic spell:
const curry = (
  f, arr = []
) => (...args) => (
  a => a.length === f.length ?
    f(...a) :
    curry(f, a)
)([...arr, ...args]);
const transduce = curry((step, initial, xform, foldable) =>
  foldable.reduce(xform(step), initial)
);

const concatArray = (a, c) => a.concat([c]);

const toArray = transduce(concatArray, []);

// Manual transduce:
const xform2 = doubleEvens(arrayConcat);
const result2 = [1,2,3,4,5,6].reduce(xform2, []);
console.log(result2);
// => [4, 8, 12]
// Automatic transduce:
const result3 = toArray(doubleEvens, [1,2,3,4,5,6]);
console.log(result3); // [4, 8, 12]

const friends = [
  { id: 1, name: 'Sting', nearMe: true },
  { id: 2, name: 'Radiohead', nearMe: true },
  { id: 3, name: 'NIN', nearMe: false },
  { id: 4, name: 'Echo', nearMe: true },
  { id: 5, name: 'Zeppelin', nearMe: false }
];
const isNearMe = ({ nearMe }) => nearMe;
const getName = ({ name }) => name;
const getFriendsNearMe = compose(
  filter(isNearMe),
  map(getName)
);
const result4 = toArray(getFriendsNearMe, friends);
console.log('result4', result4);