import { takeLast } from 'rxjs/operators';
import { createAction, actionPipeWithSwitchMap } from './switchMap_wrong_usage';

test('Error of removing all elements from list', (done) => {
    const list = ['one', 'two', 'three'];
    const action = createAction();
    actionPipeWithSwitchMap(action, list)
        .pipe(
            takeLast(1),
        )
        .subscribe((lastValue) => {
            console.log(lastValue);
            expect(list.length).toBe(1);
            done();
        });
    action.next(1);
    action.next(1);
    action.next(1);
    action.complete();
});
