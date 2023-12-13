import { flatten } from "lodash";
import { all, fork } from "redux-saga/effects";
import * as masterSagas from "./master";

const forked = flatten(
	[masterSagas].map(sagas => Object.keys(sagas).map(key => fork(sagas[key])))
);

export function* root() {
	yield all(forked);
}
