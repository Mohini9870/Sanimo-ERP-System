import { CLOSE_MODAL, OPEN_MODAL } from "constants/modal";

export const getActiveModal = state => {
	return state.modals.active;
};

export const modalReducer = (
	state = { list: [], active: null },
	{ type, payload }
) => {
	switch (type) {
		case OPEN_MODAL:
			return {
				...state,
				list: [...state.list, payload],
				active: payload,
			};

		case CLOSE_MODAL:
			const index = state.list.findIndex(modal => modal.name === payload?.name);
			let { active } = state;
			if (index === state.list.length - 1) {
				active = state.list[index - 1] || null;
			}
			const list = [...state.list];
			list.splice(index, 1);
			return {
				...state,
				active,
				list,
			};

		default:
			return state;
	}
};
