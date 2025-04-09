import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import toDoListReducer from '../reducers/toDoListReducer';

let reducers = combineReducers({
    toDoList: toDoListReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;