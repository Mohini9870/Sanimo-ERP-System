import { reducer as formReducer } from "redux-form";
import { masterReducer } from "./master";
import { modalReducer } from "./modal";
import { userReducer } from "./user";

export const rootReducers = {
	masterDetails: masterReducer,
	userDetails: userReducer,
	modals: modalReducer,
	form: formReducer,
};
