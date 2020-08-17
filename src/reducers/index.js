import {combineReducers} from "redux";
import {reducer as FormReducer} from "redux-form";
import ErrorReducer from "./ErrorReducer";
import UserReducer from "./UserReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
	form: FormReducer,
	error: ErrorReducer,
	users: UserReducer,
	auth: AuthReducer
});