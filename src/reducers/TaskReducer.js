import _ from "lodash";

export default (state = {}, action) => {
	switch(action.type) {
		case "FETCH_TASKS":
			//'Soft-drops' state on login and logout with pick
			//Turns payload array into object with mapKeys
			return {..._.pick(state, action.payload), ..._.mapKeys(action.payload, "_id")};
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