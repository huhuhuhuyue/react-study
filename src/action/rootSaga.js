import {all} from "redux-saga/effects";
import loginSaga from "./loginSaga";

// 如果有多个saga
export default function* rootSaga() {
  yield all([loginSaga()]);
}
