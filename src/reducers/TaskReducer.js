import _ from "lodash";

export default (state = {}, action) => {
	switch(action.type) {
		case "FETCH_TASKS":
			const payloadObj = action.payload.reduce((payloadObj, task) => {	//Accumulates action.payload array's items into object
				payloadObj[task._id] = task;
				return payloadObj;
			}, {});
			return {...state, ...payloadObj};
		case "CREATE_TASK":
		case "FETCH_TASK":
		case "UPDATE_TASK":
			return {...state, [action.payload._id]: action.payload};
		case "DELETE_TASK":
			return {..._.omit(state, action.payload)}
		default:
			return state;
	};
};