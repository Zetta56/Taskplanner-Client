// import _ from "lodash";

// export default (state = {}, action) => {
// 	switch(action.type) {
// 		case "REORDER_STEPS":
// 			return {...state, ..._.mapKeys(action.payload, "_id")};
// 		case "FETCH_STEPS":
// 			return {..._.pick(state, action.payload), ..._.mapKeys(action.payload, "_id")};
// 		case "CREATE_STEP":
// 		case "UPDATE_STEP":
// 			return {...state, [action.payload._id]: action.payload};
// 		case "DELETE_STEP":
// 			return {..._.omit(state, action.payload)};
// 		default:
// 			return state;
// 	};
// };

import _ from "lodash";

export default (state = [], action) => {
	switch(action.type) {
		case "REORDER_STEPS":
			const payloadIds = action.payload.map(step => step._id);
			const filteredState = [...state.filter(step => !payloadIds.includes(step._id))];
			return [...filteredState, ...action.payload];
		case "FETCH_STEPS":
			return [...state.filter(step => step._id === action.payload._id), ...action.payload];
		case "CREATE_STEP":
			return [...state, action.payload]
		case "UPDATE_STEP":
			return [...state.map(step => step._id === action.payload._id ? action.payload : step)]
		case "DELETE_STEP":
			return [...state.filter(step => step._id !== action.payload)];
		default:
			return state;
	};
};