import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { root as rootSaga } from "./sagas";

import thunk from "redux-thunk";
import { notificationsManager } from "./middlewares/notifications.middleware";
import { rootReducers } from "./reducers";

const persistConfig = {
	key: "root",
	whitelist: ["userDetails"],
	storage,
};

export const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers(rootReducers);
const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [thunk, sagaMiddleware, notificationsManager];

let initialState = {};

const store = createStore(
	persistedReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
export { store, persistor };
