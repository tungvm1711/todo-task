import {ALTER_SESSION_SUCCESS, DELETE_CURRENT_SESSION_SUCCESS, INIT_SESSION_SUCCESS} from "../actions/session";

const _nullSession = {session: {}, isAuth: false};
export default (state = _nullSession, {type, session}) => {
    switch (type) {
        case INIT_SESSION_SUCCESS:
            return {
                ...state,
                isAuth: Object.keys(session).length > 0 ? true : false,
                session: session
            };
        case ALTER_SESSION_SUCCESS:
            return {
                ...state,
                session: session
            };
        case DELETE_CURRENT_SESSION_SUCCESS:
            return _nullSession;
        default:
            return state;
    }
};