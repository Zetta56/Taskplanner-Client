export default (state = {dropdown: null, accordion: []}, action) => {
	switch(action.type) {
		case "SELECT_ACCORDION":
			return {...state, accordion: [...state.accordion, action.payload]};
		case "DESELECT_ACCORDION":
			return {...state, accordion: [...state.accordion.filter(index => index !== action.payload)]};
		case "SELECT_DROPDOWN":
			return {...state, dropdown: action.payload};
		default:
			return state;
	};
};