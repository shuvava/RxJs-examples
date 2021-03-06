import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';

console.log('app started');
// BORROWED HEAVILY FROM REDUX
const combineReducers = (reducers) => {
    const reducerKeys = Object.keys(reducers);
    return (state, action) => {
        const nextState = {};
        let hasChanged = false;
        for (let i = 0; i < reducerKeys.length; i += 1) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
};
const counter1 = (state = 0, action) => {
    switch (action.type) {
        case 'C1_INCREMENT':
            return state + 1;
        case 'C1_DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
const counter2 = (state = 0, action) => {
    switch (action.type) {
        case 'C2_INCREMENT':
            return state + 1;
        case 'C2_DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
const reducer = combineReducers({
    counter1,
    counter2,
});

const initialState = reducer({}, { TYPE: '_INIT' });
const mySubject = (new Subject())
    .scan(reducer, initialState);
const myStore = new BehaviorSubject(initialState);
mySubject.subscribe(myStore);

myStore.subscribe({
    next: (o) => {
        console.log('A');
        console.log(o);
    },
});
mySubject.next({
    type: 'C1_INCREMENT',
});
myStore.subscribe({
    next: (o) => {
        console.log('B');
        console.log(o);
    },
});
mySubject.next({
    type: 'C1_INCREMENT',
});
