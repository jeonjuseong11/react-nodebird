import {
  all,
  fork,
  call,
  take,
  put,
  takeEvery,
  takeLatest,
  throttle,
  delay,
} from "redux-saga/effects";
import axios from "axios";
function logInAPI(data) {
  return axios.post("/api/login", data);
}
function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    //yield는 테스트 하기 좋음
    yield put({
      //put을 dispatch로 생각하면 됨
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      //put을 dispatch로 생각하면 됨
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}
function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      //put을 dispatch로 생각하면 됨
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}
export default function* rootSaga() {
  yield all([
    fork(watchLogIn), //call과의 차이점 알아둘 것
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
