import { throwError, timer } from 'rxjs';
import {
    tap, catchError, retryWhen, mergeMap, finalize,
} from 'rxjs/operators';

const genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [],
} = {}) => attempts => attempts
    .pipe(
        mergeMap((error, i) => {
            const retryAttempt = i + 1;
            // if maximum number of retries have been met
            // or response is a status code we don't wish to retry, throw error
            if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
                return throwError(error);
            }
            console.log(
                `Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`,
            );
            // retry after 1s, 2s, etc...
            return timer(retryAttempt * scalingDuration);
        }),
        finalize(() => console.log('We are done!')),
    );

// emits an error with specified value on subscription
const source = throwError('This is an error!');
// output: 'Error: This is an error!'
const subscribe = source
    .pipe(
        tap(() => console.log('HTTP request executed')),
        // defaults to all values so we set it to just keep and replay last one
        retryWhen(genericRetryStrategy()),
        catchError((err) => {
            console.error('Handling error locally and rethrowing it...', err);
            return throwError(err);
        }),
    )
    .subscribe({
        next: val => console.log(val),
        complete: () => console.log('Complete!'),
        error: val => console.log(`Error: ${val}`),
    });
