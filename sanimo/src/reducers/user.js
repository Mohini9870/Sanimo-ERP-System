import { GET_MASTER_LIST } from "constants/master";
import {
	CLEAR_USER_DETAILS,
	LOGIN_USER,
	LOGOUT_USER,
	SELECT_COMPANY,
} from "constants/user";

const initialState = {
	isUserLoggingIn: false,
	isLoggedIn: false,
	role: null,
	token: null,
	isUserLoggingOut: false,
	userId: null,
	selectedCompanyId: null,
};

export const getUserDetails = state => {
	return state.userDetails;
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_USER.REQUEST:
			return { ...state, isUserLoggingIn: true };
		case LOGIN_USER.SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				isUserLoggingIn: false,
				token: payload?.data?.data?.session_token,
				userId: payload?.data?.data?.user_id,
			};
		case LOGIN_USER.FAILURE:
			return {
				...state,
				isUserLoggingIn: false,
			};
		case LOGOUT_USER.REQUEST:
			return { ...state, isUserLoggingOut: true };
		case LOGOUT_USER.SUCCESS:
		case CLEAR_USER_DETAILS:
			return {
				...state,
				role: null,
				token: null,
				isLoggedIn: false,
				isUserLoggingOut: false,
				userId: null,
			};
		case LOGOUT_USER.FAILURE:
			return {
				...state,
				isUserLoggingOut: false,
			};

		case GET_MASTER_LIST.SUCCESS:
			if (
				payload?.masterName === "company" &&
				state.selectedCompanyId === null
			) {
				const {
					data: {
						data: { results },
					},
				} = payload;
				return {
					...state,
					selectedCompanyId: results?.[0]?.id || null,
				};
			}
			return {
				...state,
			};

		case SELECT_COMPANY:
			return {
				...state,
				selectedCompanyId: payload,
			};
		default:
			return state;
	}
};
