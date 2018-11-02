import { interval } from 'rxjs';
import { map, take, retryWhen , delay } from 'rxjs/operators';

const source = interval(1000)
    .pipe(
        map((n) => {
            if (n === 2) {
                throw new Error('ex');
            }
            return n;
        }),
        retryWhen(errors => errors
            .pipe(
                delay(200),
            )),
        take(6),
    );
const subscription = source.subscribe(
    (x) => {
        console.log(`Next: ${x}`);
    },
    (err) => {
        console.log(`Error: ${err}`);
    },
    () => {
        console.log('Completed');
    },
);
