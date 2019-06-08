import {alterSession, initSession, removeSession} from '../util/session';
import {push} from 'react-router-redux';

export const DELETE_CURRENT_SESSION_SUCCESS = 'DELETE_CURRENT_SESSION_SUCCESS';
export const WAIT_SESSION_ACTION = 'WAIT_SESSION_ACTION';
export const INIT_SESSION_SUCCESS = 'INIT_SESSION_SUCCESS';
export const ALTER_SESSION_SUCCESS = 'ALTER_SESSION_SUCCESS';

export const removeSuccess = () => {
    return {
        type: DELETE_CURRENT_SESSION_SUCCESS
    };
};
export const wait = () => {
    return {
        type: WAIT_SESSION_ACTION
    };
};
export const initSuccess = (session) => {
    return {
        type: INIT_SESSION_SUCCESS,
        session
    };
};
export const alterSuccess = (session) => {
    return {
        type: ALTER_SESSION_SUCCESS,
        session
    };
};

export const init = (name) => {
    return (dispatch) => {
        dispatch(wait());

        return initSession()
            .then((data) => {
                localStorage.removeItem('Auth');
                localStorage.removeItem('SessionName');
                localStorage.setItem('Auth', data.sessionId);
                localStorage.setItem('SessionName', name);
                dispatch(initSuccess(data));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};
export const alter = () => {
    return (dispatch) => {
        dispatch(wait());

        return alterSession()
            .then((data) => {
                dispatch(alterSuccess(data));
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};
export const remove = () => {
    return (dispatch) => {
        dispatch(wait());
        return removeSession(localStorage.getItem('Auth'))
            .then(() => {
                localStorage.removeItem('Auth');
                localStorage.removeItem('SessionName');
                dispatch(removeSuccess());
            })
            .catch(() => {
                dispatch(push('/internal-server-error'));
            });
    };
};
