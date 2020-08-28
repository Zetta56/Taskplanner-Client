import {combineReducers} from "redux";
import {reducer as FormReducer} from "redux-form";
import ErrorReducer from "./ErrorReducer";
import AuthReducer from "./AuthReducer";
import TaskReducer from "./TaskReducer";
import StepReducer from "./StepReducer";
import AccordionReducer from "./AccordionReducer";

export default combineReducers({
	form: FormReducer,
	error: ErrorReducer,
	auth: AuthReducer,
	tasks: TaskReducer,
	steps: StepReducer,
	accordion: AccordionReducer
});