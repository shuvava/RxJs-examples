import { Observable } from 'rxjs/Observable';

let unsubscribe;

const observable = Observable.create((observer) => {
    // Keep track of the interval resource
    const intervalID = setInterval(() => {
        observer.next('hi');
    }, 1000);

    // Provide a way of canceling and disposing the interval resource
    unsubscribe = () => {
        observer.complete();
        clearInterval(intervalID);
    };
});
observable.subscribe({
    next: o => console.log(o),
    error: err => console.log(err),
    complete: () => console.log('complete'),
});

setInterval(() => {
    unsubscribe();
}, 4000);
