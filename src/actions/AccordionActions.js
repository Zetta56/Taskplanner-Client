export const selectAccordion = (index) => {
	return {
		type: "SELECT_ACCORDION",
		payload: index
	};
};

export const deselectAccordion = (index) => {
	return {
		type: "DESELECT_ACCORDION",
		payload: index
	};
};