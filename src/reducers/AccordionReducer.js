export default (state = [], action) => {
	switch(action.type) {
		case "SELECT_ACCORDION":
			return [...state, action.payload];
		case "DESELECT_ACCORDION":
			return [...state.filter(index => index !== action.payload)];
		default:
			return state;
	};
};