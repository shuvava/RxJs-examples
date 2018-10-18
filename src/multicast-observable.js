import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/multicast';

const myObservable = Observable.create((observer) => {
    let counter = 1;
    const intervalID = setInterval(() => {
        console.log(counter);
        observer.next(counter);
        counter += 1;
    }, 1000);
    return () => {
        clearInterval(intervalID);
    };
});
/**
 * multicast
 * Returns an Observable that emits the results of invoking a specified selector on items emitted by a
 * ConnectableObservable that shares a single subscription to the underlying stream.
*/
const myMultiObservable = myObservable
    .multicast(new Subject())
    .refCount();

const mySubscriptionA = myMultiObservable.subscribe({
    next: o => console.log(`observer A: ${o}`),
});

setTimeout(() => {
    const mySubscriptionB = myMultiObservable.subscribe({
        next: o => console.log(`observer B: ${o}`),
    });
    setTimeout(() => mySubscriptionB.unsubscribe(), 5000);
}, 3000);
setTimeout(() => mySubscriptionA.unsubscribe(), 5000);
