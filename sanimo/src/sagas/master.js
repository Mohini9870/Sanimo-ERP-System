import { put, select, takeLatest } from "redux-saga/effects";

import { getMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { addNotification } from "actions/notifications";
import { clearUserDetails } from "actions/user";
import { importModalName } from "components/masters/import/ImportModal";
import {
	ADD_MASTER_LIST,
	EDIT_MASTER_LIST,
	IMPORT_MASTER,
} from "constants/master";
import { getActiveModal } from "reducers/modal";

function* fetchMasterList({ payload }) {
	yield put(
		getMasterList(payload?.masterName, {
			page: 1,
			page_size: 10,
			status: payload?.status,
		})
	);
}

function* closeMasterModal() {
	const modal = yield select(getActiveModal);
	yield put(closeModal(modal?.name));
}

export function* watchMasterListChanges() {
	yield takeLatest(
		[ADD_MASTER_LIST.SUCCESS, EDIT_MASTER_LIST.SUCCESS, IMPORT_MASTER.SUCCESS],
		fetchMasterList
	);
}

export function* watchCloseModalChanges() {
	yield takeLatest(
		[ADD_MASTER_LIST.SUCCESS, EDIT_MASTER_LIST.SUCCESS],
		closeMasterModal
	);
}

function* errorHandler({ payload }) {
	if (payload?.response?.status === 401) {
		yield put(clearUserDetails());
		yield put(
			addNotification({
				message: "Unauthorized",
				type: "error",
			})
		);
	} else {
		yield put(
			addNotification({
				message: payload?.response?.data?.data?.message,
				type: "error",
			})
		);
	}
}

export function* watchApiError() {
	yield takeLatest(function (action) {
		if (action?.type?.includes("FAILURE")) return action;
	}, errorHandler);
}

export function* importModalClose() {
	yield takeLatest(
		[IMPORT_MASTER.FAILURE, IMPORT_MASTER.SUCCESS],
		function* closeImportModal() {
			yield put(closeModal(importModalName));
		}
	);
}
