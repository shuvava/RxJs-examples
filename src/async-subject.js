import 'babel-polyfill';
import { AsyncSubject } from 'rxjs/AsyncSubject';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// async function sleep(fn, ...args) {
//     await timeout(3000);
//     return fn(...args);
// }

const subject = new AsyncSubject();

subject.subscribe({
    next: v => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

// subject.subscribe({
//     next: async (v) => {
//         await Promise.all([timeout(500)]);
//         console.log(`observerB: ${v}`);
//     },
// });

subject.next(5);
timeout(100)
    .then(() => subject.next(6));


setTimeout(() => {
    subject.complete();
    console.log('completed');
}, 3000);
// subject.complete();
