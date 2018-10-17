
import { interval } from 'rxjs';
import { combineLatest, takeUntil, take } from 'rxjs/operators';

const emiter = interval(1000);

class TestMemoryLeakType1 {
    constructor(_emiter) {
        this.emiter = _emiter;
    }

    run() {
        this.emiter
            .subscribe(
                value => console.log(`Emitted value: ${value}`),
                error => console.error(error),
                () => console.log('Completed'),
            );
    }
}
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
    t = undefined;
    console.log('!!!!! Object TestMemoryLeakType1 was destroyed !!!!');
}, 3000);