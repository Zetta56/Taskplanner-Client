export default (state = {accordion: [], createButton: false}, action) => {
	switch(action.type) {
		case "SELECT_ACCORDION":
			return {...state, accordion: [...state.accordion, action.payload]};
		case "DESELECT_ACCORDION":
			return {...state, accordion: [...state.accordion.filter(index => index !== action.payload)]};
		case "SELECT_CREATE":
			return {...state, createButton: true};
		default:
			return state;
	};
};