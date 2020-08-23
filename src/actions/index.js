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

		dispatch(fetchTasks());

		if(!initial) {
			history.push("/");
		};
	};
};

export const fetchTasks = () => {
	return async (dispatch) => {
		const response = await express.get("/tasks");
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "FETCH_TASKS",
			payload: response.data
		});
	};
};

export const createTask = (formValues, userId) => {
	return async (dispatch) => {
		const response = await express.post("/tasks/new", {...formValues, creator: userId});
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "CREATE_TASK",
			payload: response.data
		});
		console.log("pushing")
		history.push("/");
	};
};

export const fetchTask = (taskId) => {
	return async (dispatch) => {
		const response = await express.get(`/tasks/${taskId}`);

		if(response.data.message) {
			dispatch(error(response.data.message));
			return history.push("/")
		};

		dispatch({
			type: "FETCH_TASK",
			payload: response.data
		});
	};
};

export const updateTask = (formValues, taskId) => {
	return async (dispatch) => {
		const response = await express.put(`/tasks/${taskId}`, formValues);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "UPDATE_TASK",
			payload: response.data
		});

		history.push("/");
	};
};

export const deleteAnonymousTasks = () => {
	return async (dispatch) => {
		const response = await express.delete("/tasks/anonymous");

		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "DELETE_TASKS"
		});

		history.push("/");
	};
};

export const deleteTask = (taskId) => {
	return async (dispatch) => {
		const response = await express.delete(`/tasks/${taskId}`);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "DELETE_TASK",
			payload: response.data
		});

		history.push("/");
	};
};