import { from } from 'rxjs';
import { first } from 'rxjs/operators';

const myArray = [1, 2, 3];

from(myArray)
    .pipe(
        first(),
    )
    .subscribe(
        (value) => { console.log('onNext = ', value); },
        (error) => { console.error('onError = ', error); },
        () => { console.log('complete!'); },
    );
