/**
 * original article
 * https://blog.strongbrew.io/what-are-schedulers-in-rxjs/
 * https://github.com/ReactiveX/rxjs/blob/master/doc/scheduler.md
 * Scheduler	Purpose
 * null	By not passing any scheduler, notifications are delivered synchronously and recursively. Use this for constant-time operations or tail recursive operations.
 * queueScheduler	Schedules on a queue in the current event frame (trampoline scheduler). Use this for iteration operations.
 * asapScheduler	Schedules on the micro task queue, which is the same queue used for promises. Basically after the current job, but before the next job. Use this for asynchronous conversions.
 * asyncScheduler	Schedules work with setInterval. Use this for time-based operations.
 * animationFrameScheduler	Schedules task that will happen just before next browser content repaint. Can be used to create smooth browser animations.
 */
/* eslint no-console: "off" */
import { startWith, filter } from 'rxjs/operators';
import {
    of, merge, queueScheduler, asapScheduler, asyncScheduler,
} from 'rxjs';

const asyncSchedulerExample = of('')
    .pipe(
        startWith('async', asyncScheduler),
    );
const asapSchedulerExample = of('')
    .pipe(
        startWith('asap', asapScheduler),
    );
const queueSchedulerExample = of('')
    .pipe(
        startWith('queue', queueScheduler),
    );

merge(
    asyncSchedulerExample,
    asapSchedulerExample,
    queueSchedulerExample,
)
    .pipe(
        filter(x => !!x),
    )
    .subscribe(console.log);

console.log('after subscription');
