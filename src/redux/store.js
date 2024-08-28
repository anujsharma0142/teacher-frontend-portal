// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import studentReducer from './reducers/studentReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    students: studentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
