import { CLOSE_MODAL, OPEN_MODAL } from "constants/modal";

export const openModal = (name, data) => async dispatch => {
	dispatch({ type: OPEN_MODAL, payload: { name, data } });
};

export const closeModal = name => async dispatch => {
	dispatch({ type: CLOSE_MODAL, payload: { name } });
};
