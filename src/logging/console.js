console.log('before 1st group');
console.group('top level');
console.log('some log');
console.groupEnd('top level');

function foo() {
    function bar() {
        console.trace();
    }
    bar();
}

foo();

console.count('Counter');
console.count('Counter');
console.count('Counter');
console.countReset('Counter');
console.count('Counter');

console.time('performance testing');
setTimeout(() => console.timeEnd('performance testing'), 100);

function greaterThan(a, b) {
    console.assert(a > b, { message: 'a is not greater than b', a: a, b: b });
}
greaterThan(2, 1);
greaterThan(1, 2);

function thisNeedsToBeProfiled() {
    console.profile('thisNeedsToBeProfiled()');
    // позже, после выполнения нужных действий
    console.profileEnd();
}

console.log('memory usage', console.memory);

const users = [
    { name: 'Bob', age: 26 },
    { name: 'Alisa', age: 22 },
];
console.table(users);
