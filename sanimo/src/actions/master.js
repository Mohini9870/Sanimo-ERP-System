import axios from "axios";

import {
	ADD_MASTER_LIST,
	EDIT_MASTER_LIST,
	EXPORT_MASTER,
	GET_MASTER_LIST,
	IMPORT_MASTER,
} from "constants/master";
import stringifyQueryParams from "utils/stringifyQueryParams";

import { base_url } from "./baseUrls";
import { addNotification } from "./notifications";

export const getMasterList =
	(masterName, query = {}) =>
	async (dispatch, getState) => {
		try {
			const queryString = stringifyQueryParams(query);
			dispatch({ type: GET_MASTER_LIST.REQUEST });

			const { token, userId, selectedCompanyId } = getState().userDetails;

			const config = {
				headers: {
					"Content-Type": "application/json",
					"Session-Token": token,
					"Company-Id": selectedCompanyId,
				},
			};

			const { data } = await axios.get(
				`${base_url}/v1/user/${userId}/${masterName}/list?${queryString}`,
				config
			);

			dispatch({
				type: GET_MASTER_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					masterName,
					query,
				},
			});
		} catch (error) {
			dispatch({ type: GET_MASTER_LIST.FAILURE, payload: error });
		}
	};

export const addMasterList =
	(masterName, masterData, status = null, configType = "application/json") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ADD_MASTER_LIST.REQUEST });

			const { token, userId, selectedCompanyId } = getState().userDetails;

			const config = {
				headers: {
					"Content-Type": configType,
					"Session-Token": token,
					"Company-Id": selectedCompanyId,
				},
			};

			const { data } = await axios.post(
				`${base_url}/v1/user/${userId}/${masterName}/create`,
				masterData,
				config
			);

			dispatch({
				type: ADD_MASTER_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					status,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: ADD_MASTER_LIST.FAILURE, payload: error });
		}
	};

export const editMasterList =
	(masterName, masterData, status = null, configType = "application/json") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: EDIT_MASTER_LIST.REQUEST });

			const { token, userId, selectedCompanyId } = getState().userDetails;

			const config = {
				headers: {
					"Content-Type": configType,
					"Session-Token": token,
					"Company-Id": selectedCompanyId,
				},
			};

			const { data } = await axios.post(
				`${base_url}/v1/user/${userId}/${masterName}/update`,
				masterData,
				config
			);

			dispatch({
				type: EDIT_MASTER_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					status,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: EDIT_MASTER_LIST.FAILURE, payload: error });
		}
	};

// export const getDropdownList =
// 	(masterName, query = {}) =>
// 	async (dispatch, getState) => {
// 		try {
// 			dispatch({ type: GET_DROPDOWN_LIST.REQUEST });

// 			const { token, userId, selectedCompanyId } = getState().userDetails;

// 			const config = {
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Session-Token": token,
// 					"Company-Id": selectedCompanyId,
// 				},
// 			};

// 			const queryString = stringifyQueryParams({
// 				...query,
// 				dropdown: 1,
// 				sort: "id",
// 			});

// 			const { data } = await axios.get(
// 				`${base_url}/v1/user/${userId}/${masterName}/dropdown/list?${queryString}`,
// 				config
// 			);

// 			dispatch({
// 				type: GET_DROPDOWN_LIST.SUCCESS,
// 				payload: {
// 					success: "success",
// 					data,
// 					masterName,
// 				},
// 			});
// 		} catch (error) {
// 			dispatch({ type: GET_DROPDOWN_LIST.FAILURE, payload: error });
// 		}
// 	};

export const exportMasterList =
	(master, status) => async (dispatch, getState) => {
		try {
			dispatch({ type: EXPORT_MASTER.REQUEST });

			const { token, userId, selectedCompanyId } = getState().userDetails;

			const config = {
				headers: {
					"Content-Type": "application/json",
					"Session-Token": token,
					"Company-Id": selectedCompanyId,
				},
			};

			const { data } = await axios.post(
				`${base_url}/user/${userId}/bulk/export/master?status=${+status}`,
				{ master },
				config
			);

			let a = document.createElement("a");
			a.href = data?.data?.url;
			a.click();

			dispatch({
				type: EXPORT_MASTER.SUCCESS,
				payload: {
					success: "success",
				},
			});
		} catch (error) {
			dispatch({ type: EXPORT_MASTER.FAILURE, payload: error });
		}
	};

export const importMaster =
	(formData, masterName, status) => async (dispatch, getState) => {
		try {
			dispatch({ type: IMPORT_MASTER.REQUEST });

			const { token, userId, selectedCompanyId } = getState().userDetails;

			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					"Session-Token": token,
					"Company-Id": selectedCompanyId,
				},
			};

			const { data } = await axios.post(
				`${base_url}/user/${userId}/bulk/upload/master`,
				formData,
				config
			);

			if (!data?.data?.url) {
				dispatch(
					addNotification({ message: data?.data?.message, type: "success" })
				);
			} else {
				let a = document.createElement("a");
				a.href = data?.data?.url;
				a.click();
				dispatch(
					addNotification({ message: data?.data?.message, type: "error" })
				);
			}

			dispatch({
				type: IMPORT_MASTER.SUCCESS,
				payload: {
					success: "success",
					masterName,
					status,
				},
			});
		} catch (error) {
			dispatch({ type: IMPORT_MASTER.FAILURE, payload: error });
		}
	};

// export const downloadFile = file => async (dispatch, getState) => {
// 	try {
// 		dispatch({ type: DOWNLOAD_FILE.REQUEST });

// 		axios
// 			.get(`${base_url}/files/${file?.id}`, {
// 				headers: {
// 					Authorization: `Bearer ${getState().userDetails?.token}`,
// 				},
// 				responseType: "blob",
// 			})
// 			.then(response => {
// 				let url = window.URL.createObjectURL(new Blob([response.data]));
// 				let a = document.createElement("a");
// 				a.href = url;
// 				a.download = file?.name;
// 				a.click();
// 			});

// 		dispatch({
// 			type: DOWNLOAD_FILE.SUCCESS,
// 			payload: {
// 				success: "success",
// 			},
// 		});
// 	} catch (error) {
// 		dispatch({ type: DOWNLOAD_FILE.FAILURE, payload: error });
// 	}
// };
