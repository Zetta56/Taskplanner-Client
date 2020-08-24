import Reorder, {reorder, reorderFromTo} from "react-reorder";
import express from "../api/express";
import {error} from "./index";

export const reorderSteps = (steps, previousIndex, nextIndex) => {
	return {
		type: "REORDER_STEPS",
		payload: reorder(steps, previousIndex, nextIndex)
	}
};

export const fetchSteps = (taskId) => {
	return async (dispatch) => {
		const response = await express.get(`/tasks/${taskId}/steps`);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "FETCH_STEPS",
			payload: response.data
		});
	};
};

export const createStep = (formValues, taskId) => {
	return async (dispatch) => {
		const response = await express.post(`/tasks/${taskId}/steps`, {...formValues});
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "CREATE_STEP",
			payload: response.data
		});
	};
};

export const updateStep = (formValues, taskId, stepId) => {
	return async (dispatch) => {
		const response = await express.put(`/tasks/${taskId}/steps/${stepId}`, formValues);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "UPDATE_STEP",
			payload: response.data
		});
	};
};

export const deleteStep = (taskId, stepId) => {
	return async (dispatch) => {
		const response = await express.delete(`/tasks/${taskId}/steps/${stepId}`);
		
		if(response.data.message) {
			return dispatch(error(response.data.message));
		};

		dispatch({
			type: "DELETE_STEP",
			payload: response.data
		});
	};
};