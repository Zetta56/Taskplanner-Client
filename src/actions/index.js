import express from "../api/express";
import history from "../history";

export const error = (err) => {
	return {
		type: "ERROR",
		payload: err
	};
};

export const resetError = () => {
	return {
		type: "RESET_ERROR"
	};
};

export const createUser = (formValues) => {
	return async (dispatch) => {
		const response = await express.post("/register", formValues);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};
		
		await dispatch({
			type: "CREATE_USER",
			payload: response.data
		});

		await dispatch(login({username: formValues.username, password: formValues.password}))

		history.push("/");
	};
};

export const initialLogout = (userId) => {
	return {
		type: "LOGOUT"
	};
};

export const login = (formValues) => {
	if(!formValues.password) {		//Accessed on initial app render
		return {
			type: "LOGIN",
			payload: formValues
		};
	} else {	//Accessed from login form
		return async (dispatch) => {
			const response = await express.post("/login", formValues);
			
			if(response.data.message) {
				return dispatch(error(response.data.message));
			};
			
			await dispatch({
				type: "LOGIN",
				payload: response.data
			});
			
			history.push("/");
		};
	};
};

export const logout = () => {
	return async (dispatch) => {
		await express.get("/logout");
		
		dispatch({
			type: "LOGOUT",
		});
	};
};