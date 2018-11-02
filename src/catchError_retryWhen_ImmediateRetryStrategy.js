import { throwError } from 'rxjs';
import { tap, shareReplay, retryWhen } from 'rxjs/operators';

/**
 * please check more simple logic inside of intervals.js
 */

// emits an error with specified value on subscription
const source = throwError('This is an error!');
// output: 'Error: This is an error!'
const subscribe = source
    .pipe(
        tap(() => console.log('HTTP request executed')),
        // defaults to all values so we set it to just keep and replay last one
        shareReplay(1),
        retryWhen(errors => errors
            .pipe(
                tap(() => console.log('retrying...')),
            )),
    )
    .subscribe({
        next: val => console.log(val),
        complete: () => console.log('Complete!'),
        error: val => console.log(`Error: ${val}`),
    });
