/* eslint no-console: "off" */
import { groupBy, concatMap, map } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';

const records = [
    { id: 'a', category: 1 },
    { id: 'b', category: 2 },
    { id: 'c', category: 3 },
    { id: 'd', category: 1 },
    { id: 'e', category: 2 },
    { id: 'f', category: 3 },
    { id: 'g', category: 1 },
    { id: 'h', category: 2 },
];

const pipedRecords = new Subject();
const result = pipedRecords
    .pipe(
        groupBy(
            x => x.category,
            null,
            null,
            () => new ReplaySubject(), // Use ReplaySubject instead
        ),
        concatMap(
            group$ => group$.pipe(
                map(obj => ({ key: group$.key, value: obj })),
            ),
        ),
    );
result.subscribe(x => console.log(x));
records.forEach(x => pipedRecords.next(x));
pipedRecords.complete();
