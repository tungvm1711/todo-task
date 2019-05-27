import {CREATE_TASK_SUCCESS, FETCH_TODOS_SUCCESS} from "../actions/todotask";

const _nullTodos = {todos: {}, filterType: 'completed'};
export default (state = _nullTodos, {type, todos, filterType}) => {
    switch (type) {
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos
            };
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                todos
            };
        default:
            return state;
    }
};