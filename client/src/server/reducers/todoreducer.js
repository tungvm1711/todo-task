import {CREATE_TASK_SUCCESS, FETCH_TODOS_SUCCESS, REMOVE_TASK_SUCCESS, UPDATE_TASK_SUCCESS} from "../actions/todotask";
import 'lodash';
import _ from 'lodash';

const _nullTodos = {todos: {}};
export default (state = _nullTodos, {type, payload}) => {
    switch (type) {
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: payload.todos
            };
        case CREATE_TASK_SUCCESS:
            const id = payload.todo.id;
            const data = {
                [id]: payload.todo
            };
            return {
                ...state,
                todos: _.assign(data, state.todos)
            };
        case REMOVE_TASK_SUCCESS:
            delete state.todos[payload];
            return {
                ...state,
                todos: state.todos
            };
        case UPDATE_TASK_SUCCESS:
            _.set(state.todos[payload.id], 'isCompleted', payload.isCompleted);
            _.set(state.todos[payload.id], 'text', payload.text);
            _.set(state.todos[payload.id], 'urgency', payload.urgency);
            return {
                ...state,
                todos: state.todos
            };
        default:
            return state;
    }
};