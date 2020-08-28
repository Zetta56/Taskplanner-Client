import express from "../api/express";
import history from "../history";
import {error} from "./index";

export const createUser = (formValues) => {
	return async (dispatch) => {
		const response = await express.post("/register", formValues);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch(login({username: formValues.username, password: formValues.password}));

		history.push("/");
	};
};

export const login = (formValues, initial) => {
	//Accessed on initial app render
	if(initial) {
		return {
			type: "LOGIN",
			payload: formValues
		};
	};
	//Accessed from login form
	return async (dispatch) => {
		const response = await express.post("/login", formValues);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};
		
		dispatch({
			type: "LOGIN",
			payload: response.data
		});
		
		history.push("/");
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