/*
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
*/

// Creating a Basic Increment Reducer that updates the state

// Created a reducer helper 
const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if(todo.id !== action.id) return todo;
            return {
                ...todo,
                completed: !todo.completed
            };
        default:
            return state;
    }
}

//Reducer #1 to manage the ToDo list
const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state , todo(undefined, action)];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

//Reducer #2 to manage the visibiltyFilter
const visibiltyFilter = (state = 'SHOW_ALL' , action) => {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

//Combine Reducer, combines the Todo and Visibility reducer into one reducer

const combineReducer = (state = {}, action) => {
    
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
