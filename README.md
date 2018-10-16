# RxJs-examples

## Main definitions

[definition of Observable](https://rxjs-dev.firebaseapp.com/guide/observable)
||SINGLE|MULTIPLE|
|---|---|---|
|Pull|Function|Iterator|
|Push|Promise|Observable|


It is important to observe that Observables, unlike Promises, are lazy, i.e., the function passed to create is not executed until it is subscribed to. [For example](./src/lazy.js)