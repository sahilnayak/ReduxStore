/*
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
*/

// Creating a Basic Increment Reducer that updates the state
const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// Creates a store using the reducer to tell the store how to update.
// Store has 3 methods: getState, dispatch(dispatches action) and subscribe(updates the UI with the new state)
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({});

    return {getState, dispatch, subscribe };
}

//Create the inital store
const store = createStore(counter);

//Creates a render method that is called when the app is started
const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root');
    );
}


//Adds render as a listener so whenever changes are made to the state the application renders again
store.subscribe(render);
render();
