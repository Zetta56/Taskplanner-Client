import express from "../api/express";
import history from "../history";
import {error} from "./index";

export const fetchTasks = (filter) => {
	return async (dispatch) => {
		try {
			const response = await express.get("/tasks", {params: {filter: filter}});

			dispatch({
				type: "FETCH_TASKS",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect);
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const createTask = () => {
	return async (dispatch) => {
		try {
			const response = await express.post("/tasks");

			dispatch({
				type: "CREATE_TASK",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
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
			await history.push(err.response.data.redirect || "/tasks");
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
			await history.push(err.response.data.redirect || "/tasks");
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

			history.push("/tasks");
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const deleteCompletedTasks = () => {
	return async (dispatch) => {
		try {
			const response = await express.delete("/tasks/completed");

			dispatch({
				type: "DELETE_TASKS",
				payload: response.data
			});

			history.push("/tasks");
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};