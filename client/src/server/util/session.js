import request from './request';


export const initSession = () => {
    return request({method: 'post', url: '/session/'});
};

export const alterSession = () => {
    let sessionId = localStorage.getItem('Auth');

    return request({
        method: 'patch', url: `/session/`, headers: {
            'Content-Type': 'application/json',
            'sessionId': localStorage.getItem('Auth')
        }, data: {"errorRate": 0}
    });
};

export const removeSession = () => {
    let sessionId = localStorage.getItem('Auth');
    return request({
        method: 'delete', url: `/session/`, headers: {
            'Content-Type': 'application/json',
            'sessionId': sessionId
        }
    });
};
