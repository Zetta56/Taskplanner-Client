export default (state = [], action) => {
	switch(action.type) {
		case "FETCH_STEPS":
			return [...state.filter(step => step._id === action.payload._id), ...action.payload];
		case "CREATE_STEP":
			return [...state, action.payload]
		case "UPDATE_STEP":
			return [...state.map(step => step._id === action.payload._id ? action.payload : step)]
		case "DELETE_STEP":
			return [...state.filter(step => step._id !== action.payload)];
		case "DELETE_STEPS":
			return [...state.filter(step => step._id !== null)];
		default:
			return state;
	};
};