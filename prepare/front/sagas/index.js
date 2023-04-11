import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true; //saga에서 보내는 axios 요청은 withCredential =true 가 적용됨

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
