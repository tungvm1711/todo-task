import {combineReducers} from 'redux';
import session from './sessionreducer';
import todos from './todoreducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    session,
    todos,
    form: formReducer
});