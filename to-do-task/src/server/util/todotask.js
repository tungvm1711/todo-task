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
    return request({method: 'put', url: `/todos/${todo._id}`, data: {todo}});
};

export const createTodo = (todo) => {
    console.log(todo);
    let sessionId = localStorage.getItem('Auth');
    return request({
        method: 'post',
        url: `/todos/`,
        headers: {
            'Content-Type': 'application/json',
            'sessionId': sessionId
        },
        data: {
            "text": "Think of something new to do",
            "isCompleted": false,
            "urgency": 5
        }
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