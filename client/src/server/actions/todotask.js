import {createTodo, getAllTodos, removeTodo, updateTodo} from '../util/todotask';
import {push} from 'react-router-redux';
import {wait} from "./session";

let sessionId = localStorage.getItem('Auth');

export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';

export const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';

export const fetchSuccess = (todos) => {
    return {
        type: FETCH_TODOS_SUCCESS,
        payload: todos
    };
};

export const createSuccess = (todo) => {
    return {
        type: CREATE_TASK_SUCCESS,
        payload: todo
    };
};

export const removeSuccess = (_id) => {
    return {
        type: REMOVE_TASK_SUCCESS,
        payload: _id
    };
};
export const updateSuccess = (todo) => {
    return {
        type: UPDATE_TASK_SUCCESS,
        payload: todo
    };
};


export const fetch = () => {
    return (dispatch) => {
        dispatch(wait());

        return getAllTodos()
            .then((data) => {
                dispatch(fetchSuccess(data));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};

export const create = (todo) => {
    return (dispatch) => {
        return createTodo(todo)
            .then((response) => {
                dispatch(createSuccess(response));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};

export const remove = (_id) => {
    return (dispatch) => {
        dispatch(wait());

        return removeTodo(_id)
            .then(() => {
                dispatch(removeSuccess(_id));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};
export const update = (todo) => {
    return (dispatch) => {
        dispatch(wait());

        return updateTodo(todo)
            .then(() => {
                dispatch(updateSuccess(todo));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};




