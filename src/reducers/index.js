import {combineReducers} from "redux";
import {reducer as FormReducer} from "redux-form";
import ErrorReducer from "./ErrorReducer";
import TaskReducer from "./TaskReducer";
import AuthReducer from "./AuthReducer";
import AccordionReducer from "./AccordionReducer";

export default combineReducers({
	form: FormReducer,
	error: ErrorReducer,
	auth: AuthReducer,
	tasks: TaskReducer,
	accordion: AccordionReducer
});