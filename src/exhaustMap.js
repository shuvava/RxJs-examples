/**
 * exhaustMap is used, dispatched actions are ignored whilst
 * there is a pending backend request.
use concatMap with actions that should be neither aborted nor ignored and for which the ordering must be preserved — it’s also a conservative choice that will always behave in a predictable manner;
use mergeMap with actions that should be neither aborted nor ignored and for which the ordering is unimportant;
use switchMap with read actions that should be aborted when another action of the same type is dispatched; and
use exhaustMap with actions that should be ignored whilst an action of the same type is pending.
 */
import { EventEmitter } from 'events';// core nodejs functionality
import { interval, fromEvent } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});

const clicks = fromEvent(myEmitter, 'event');
const result = clicks.pipe(
    exhaustMap(() => interval(1000)
        .pipe(
            take(5),
        )),
);
result.subscribe(x => console.log(x));
myEmitter.emit('event', 'a', 'b');
// myEmitter.emit('event', 'c', 'd');
setTimeout(() => myEmitter.emit('event', 'c', 'd'), 2000);
