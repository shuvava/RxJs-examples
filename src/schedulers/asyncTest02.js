/* eslint no-console: "off" */
import { tap, observeOn } from 'rxjs/operators';
import {
    of,
    asyncScheduler,
} from 'rxjs';

console.clear();

setTimeout(() => console.log('It will runs just after this Macrotask'));

const source$ = of(1, 2, 3).pipe(
    tap(v => console.log('tap ', v)),
    observeOn(asyncScheduler),
);

source$.subscribe((v) => {
    console.log('Value ', v);
    Promise.resolve().then(() => console.log('Microtask value ', v));
    setTimeout(() => console.log('MAcrotask value ', v), 0);
});
