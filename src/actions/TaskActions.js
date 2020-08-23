import express from "../api/express";
import history from "../history";
import {error} from "./index";

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

export const createTask = (formValues) => {
	return async (dispatch) => {
		const response = await express.post("/tasks/new", {...formValues});
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "CREATE_TASK",
			payload: response.data
		});
		
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