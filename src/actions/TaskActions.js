import express from "../api/express";
import history from "../history";
import {error} from "./index";

export const fetchTasks = () => {
	return async (dispatch) => {
		try {
			const response = await express.get("/tasks");

			dispatch({
				type: "FETCH_TASKS",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const createTask = (formValues) => {
	return async (dispatch) => {
		try {
			const response = await express.post("/tasks", {...formValues});

			dispatch({
				type: "CREATE_TASK",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const fetchTask = (taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.get(`/tasks/${taskId}`);

			dispatch({
				type: "FETCH_TASK",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const updateTask = (formValues, taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.put(`/tasks/${taskId}`, formValues);
			
			dispatch({
				type: "UPDATE_TASK",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const deleteTask = (taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.delete(`/tasks/${taskId}`);

			dispatch({
				type: "DELETE_TASK",
				payload: response.data
			});

			history.push("/");
		} catch(err) {
			await history.push(err.response.data.redirect || "/");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const deleteInactiveTasks = () => {
	return async (dispatch) => {
		try {
			const response = await express.delete("/tasks/inactive");

			dispatch({
				type: "DELETE_TASKS",
				payload: response.data
			});

			history.push("/");
		} catch(err) {
			await history.push(err.response.data.redirect || "/");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};