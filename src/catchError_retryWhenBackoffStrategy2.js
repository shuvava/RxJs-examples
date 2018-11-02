import { Observable, range, timer } from 'rxjs';
import {
    zip, retryWhen, flatMap,
} from 'rxjs/operators';
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/retrywhen.md
Observable.create((o) => {
    console.log('subscribing');
    o.onError(new Error('always fails'));
})
    .pipe(
        retryWhen(attempts => range(1, 3)
            .pipe(
                zip(attempts, i => i),
                flatMap((i) => {
                    console.log(`delay retry by ${i} second(s)`);
                    return timer(i * 1000);
                }),
            )),
    )
    .subscribe();
