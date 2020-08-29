import {reorder} from "react-reorder";
import express from "../api/express";
import {error} from "./index";
import history from "../history"

export const reorderSteps = (steps, previousIndex, nextIndex, taskId) => {
	return async (dispatch) => {
		try {
			await express.post(`/tasks/${taskId}/steps/reorder`, reorder(steps, previousIndex, nextIndex));

			//Fetches list with updated order
			dispatch(fetchSteps(taskId));
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const fetchSteps = (taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.get(`/tasks/${taskId}/steps`);

			dispatch({
				type: "FETCH_STEPS",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const createStep = (formValues, taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.post(`/tasks/${taskId}/steps`, {...formValues});

			dispatch({
				type: "CREATE_STEP",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const updateStep = (formValues, stepId, taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.put(`/tasks/${taskId}/steps/${stepId}`, formValues);

			dispatch({
				type: "UPDATE_STEP",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const deleteStep = (stepId, taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.delete(`/tasks/${taskId}/steps/${stepId}`);

			dispatch({
				type: "DELETE_STEP",
				payload: response.data
			});
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const deleteSteps = (taskId) => {
	return async (dispatch) => {
		try {
			const response = await express.delete(`/tasks/${taskId}/steps`);

			dispatch({
				type: "DELETE_STEPS",
				payload: response.data
			});

			history.push(`/tasks/${taskId}`)
		} catch(err) {
			await history.push(err.response.data.redirect || "/tasks");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};