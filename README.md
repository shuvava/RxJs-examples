# RxJs-examples

## Main definitions

[definition of Observable](https://rxjs-dev.firebaseapp.com/guide/observable)
||SINGLE|MULTIPLE|
|---|---|---|
|Pull|Function|Iterator|
|Push|Promise|Observable|


It is important to observe that Observables, unlike Promises, are lazy, i.e., the function passed to create is not executed until it is subscribed to. [For example](./src/lazy.js)

### The essential concepts in RxJS which solve async event management are:

* **Observable**: represents the idea of an invokable collection of future values or events.
* **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
* **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution.
* **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, flatMap, etc.
* **Subject**: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
* **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.
