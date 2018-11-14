import { of, Subject } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import {
    tap, delay, switchMap, finalize,
} from 'rxjs/operators';

const items = [{ id: 1 }, { id: 2 }];

const data = new Subject();
const data$ = data.asObservable();

const emitUpdateEvent = () => data.next(items);

const source = of(1)
    .pipe(
        tap(() => {
            console.log('tap');
            // const myPromise = new Promise((resolve) => {
            setTimeout(() => {
                emitUpdateEvent();
                // resolve();
            }, 100);
            // });
        }),
        switchMap(() => {
            console.log('switchMap');
            return data$;
        }),
        finalize(() => console.log('We are done!')),
    );
const subscription = source.subscribe(
    val => console.log(`Next: ${val}`),
    (err) => {
        console.log(`Error: ${err}`);
    },
    () => {
        console.log('Completed');
    },
);
const test = data$.subscribe(val => console.log(`direct Next: ${val}`));
setTimeout(() => emitUpdateEvent(), 1000);
setTimeout(() => data.complete(), 2000);
console.log('started');
