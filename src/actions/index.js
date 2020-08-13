import express from "../api/express";
import history from "../history";

export const createUser = (formValues) => {
	return async (dispatch) => {
		const response = await express.post("/users", formValues);
	
		dispatch({
			type: "CREATE_USER",
			payload: response.data
		});
		
		history.push("/");
	};
};