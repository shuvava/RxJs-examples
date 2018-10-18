
import { Subject, interval } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

class TestMemoryLeakType1 {
    constructor(_emiter) {
        this.emiter = _emiter;
        this.unsubscribe$ = new Subject();
    }

    run() {
        this.emiter
            .pipe(
                takeUntil(this.unsubscribe$),
            )
            .subscribe(
                value => console.log(`Emitted value: ${value}`),
                error => console.error(error),
                () => console.log('Completed'),
            );
    }

    destroy() {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }
}
const emiter = interval(1000);

let t = new TestMemoryLeakType1(emiter);
emiter
    .pipe(
        take(10),
    )
    .subscribe(
        value => console.log(`Main thread Emitted value: ${value}`),
        error => console.error(error),
        () => console.log('!!!!! Main thread Completed !!!!!'),
    );
t.run();
setTimeout(() => {
    t.destroy();
    t = undefined;
    console.log('!!!!! Object TestMemoryLeakType1 was destroyed !!!!');
}, 3000);
