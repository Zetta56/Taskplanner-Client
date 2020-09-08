import express from "../api/express";
import history from "../history";
import {error} from "./index";

export const createUser = (formValues) => {
	return async (dispatch) => {
		try {
			await express.post("/register", formValues);
			dispatch(login({username: formValues.username, password: formValues.password}));
		} catch(err) {
			await history.push("/register");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const login = (formValues) => {
	//Accessed on initial app render
	if(!formValues.password && !formValues.googleToken) {
		return {
			type: "LOGIN",
			payload: formValues
		}
	};

	//Accessed from login form
	return async (dispatch) => {
		try {
			const response = await express.post("/login", formValues);
			
			dispatch({
				type: "LOGIN",
				payload: response.data
			});
			
			history.push("/tasks");
		} catch(err) {
			await history.push("/login");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const logout = (initial) => {
	return async (dispatch) => {
		await express.get("/logout");
		
		dispatch({
			type: "LOGOUT",
		});

		if(!initial) {
			history.push("/login");
		};
	};
};