/**
 * Returns an Observable that emits items based on applying a function
 * that you supply to each item emitted by the source Observable
 * . Each time it observes one of these inner Observables,
 * the output Observable begins emitting the items emitted by that inner Observable.
 * When a new inner Observable is emitted, switchMap stops emitting items
 * from the earlier-emitted inner Observable and begins emitting items from the new one.
 * It continues to behave like this for subsequent inner Observables.
 *
 * switchMap is used,
 * pending backend requests are aborted in favour of more recently dispatched actions
 */
import { EventEmitter } from 'events';// core nodejs functionality
import { interval, fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});

const clicks = fromEvent(myEmitter, 'event');
const result = clicks.pipe(
    switchMap(() => interval(1000)),
);
result.subscribe(x => console.log(x));
myEmitter.emit('event', 'a', 'b');
// myEmitter.emit('event', 'c', 'd');
setTimeout(() => myEmitter.emit('event', 'c', 'd'), 3000);
