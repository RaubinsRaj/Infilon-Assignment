import { combineReducers } from "redux";
import usersReducers from "./reducers";

const rootReducer = combineReducers({
    users : usersReducers,
});

export default rootReducer;