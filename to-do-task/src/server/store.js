import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "../server/reducers/root";

export default preloadedState => (
    createStore(
        reducer,
        preloadedState,
        applyMiddleware(thunk)
    )
);