import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
const mySubject = new Subject();
const mySubscriptionA = mySubject.subscribe({
    next: o => console.log(`observer A: ${o}`),
});
const mySubscriptionB = mySubject.subscribe({
    next: o => console.log(`observer B: ${o}`),
});
myObservable.subscribe(mySubject);
setTimeout(() => mySubscriptionA.unsubscribe(), 3000);
setTimeout(() => mySubscriptionB.unsubscribe(), 5000);
