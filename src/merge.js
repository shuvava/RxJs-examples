import 'babel-polyfill';
import { interval, merge } from 'rxjs';

// emit value in sequence every 1 second
const source1 = interval(100 /* number of milliseconds */);
const source2 = interval(400 /* number of milliseconds */);

const merged = merge(source1, source2);

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const subscription = merged.subscribe(v => console.log(`observerA: ${v}`));

timeout(1000)
    .then(() => {
        subscription.unsubscribe();
        console.log('completed');
    });
