/**
 * potential bug of using switchMap:
 *  switchMap does not wait till switched observable will finish
 */
import { of } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { switchMap, delay, catchError } from 'rxjs/operators';

// eslint-disable-next-line no-unused-vars
const createAction = () => new Subject();

const removeFromBackEnd = (list, payload) => {
    const result = of(payload)
        .pipe(
            delay(20),
        );
    result
        .subscribe(inx => list.splice(inx, 1));
    return result;
};

const actionPipeWithSwitchMap = (action, list) => action
    .pipe(
        switchMap(task => removeFromBackEnd(list, task)
            .pipe(
                catchError(error => of(new Error(`Some error happened ${error}`))),
            )),
    );

export {
    createAction,
    actionPipeWithSwitchMap,
};
