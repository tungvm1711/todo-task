import request from './request';

export const getAllTodos = () => {
    let sessionId = localStorage.getItem('Auth');

    return request({
        url: '/todos/', headers: {
            'Content-Type': 'application/json',
            'sessionId': sessionId
        }
    });
};
export const updateTodo = (todo) => {
    let sessionId = localStorage.getItem('Auth');

    return request({
        method: 'patch',
        url: `/todos/${todo.id}`,
        headers: {
            'Content-Type': 'application/json',
            'sessionId': sessionId
        },
        data: {
            "text": todo.text,
            "isCompleted": todo.isCompleted,
            "urgency": todo.urgency
        }
    });
};

export const createTodo = (todo) => {
    let sessionId = localStorage.getItem('Auth');
    return request({
        method: 'post',
        url: `/todos/`,
        headers: {
            'Content-Type': 'application/json',
            'sessionId': sessionId
        },
        data: todo
    });
};

export const saveTodo = (todo) => {
    if (todo._id) {
        return updateTodo(todo);
    }
    return createTodo(todo);
};

export const removeTodo = (_id) => {
    let sessionId = localStorage.getItem('Auth');

    return request({
        method: 'delete',
        url: `/todos/${_id}`,
        headers: {
            'Content-Type': 'application/json',
            'sessionId': sessionId
        }
    });
};
