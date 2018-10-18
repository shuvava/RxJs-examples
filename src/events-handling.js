import { fromEvent } from 'rxjs';
import 'rxjs/add/operator/scan';
import { EventEmitter } from 'events';// core nodejs functionality


class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});
myEmitter.on('event', function eventHandler(a, b) {
    console.log(a, b, this, this === myEmitter);
    // Prints:
    //   a b MyEmitter {
    //     domain: null,
    //     _events: { event: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined } true
});
fromEvent(myEmitter, 'event')
    .subscribe(() => console.log('Clicked!'));
fromEvent(myEmitter, 'event')
    .scan(count => count + 1, 0)
    .subscribe(count => console.log(`Clicked ${count} times`));
myEmitter.emit('event', 'a', 'b');
