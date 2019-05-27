import {createTodo, getAllTodos, removeTodo} from '../util/todotask';
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
        todos
    };
};

export const createSuccess = (todo) => {
    return {
        type: CREATE_TASK_SUCCESS,
        todo
    };
};

export const removeSuccess = (_id) => {
    return {
        type: REMOVE_TASK_SUCCESS,
        _id
    };
};


export const fetch = () => {
    return (dispatch) => {
        dispatch(wait());

        return getAllTodos()
            .then((data) => {
                console.log(sessionId);

                dispatch(fetchSuccess(data));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};

export const create = (todo) => {
    console.log(todo);

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
    console.log(_id);
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




