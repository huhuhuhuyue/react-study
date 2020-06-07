// 调用异步操作：call
// 状态更新：put，相当于thunk中的dispatch
// 监听：takeEvery

import LoginService from "../service/login"
import {
  call,
  takeEvery,
  // take,
  // fork,
  put
} from "redux-saga/effects";
// watcher saga

// worker saga
function *loginHandle (actions) {
  yield put({type: 'REQUEST'})
  try {
    // 后面的依赖前面的，所以必须用call阻塞调用
    let res = yield call(LoginService.login, actions.payload)
    let res2 = yield call(LoginService.getMoreUserInfo, res)
    // 状态更新
    yield put({type: 'ASYNCLOGINSUCESS', payload: res2})
  } catch (err) {
    yield put({type: 'ASYNCLOGINFAILURE', payload: err})
  }
}

function *loginSaga () {
  // takeEvery和take的区别：takeEvery一直在监听，take只监听一次

  // 使用takeEvery监听LOGINSAGA，用loginHandle作处理
  // takeEvery可以让多个saga任务并⾏被fork执⾏。在发起（dispatch）到 Store并且匹配pattern 的每⼀个action上派⽣⼀个 saga 
  yield takeEvery('LOGINSAGA', loginHandle)

  // 使用take监听
  // 等待 redux dispatch 匹配某个pattern的action，take只能监听一次
  // const action = yield take('LOGINSAGA')
  
  // call和fork的区别：call是阻塞调用，fork是⽆阻塞调⽤
  // yield call(loginHandle, action)
  // yield fork(loginHandle, action)

  // 解决take只能监听一次的问题
  // while (true) {
  //   const action = yield take('LOGINSAGA')
  //   yield fork(loginHandle, action)
  // }
}

// takeEvery的实现原理
// const takeEvery = (pattern, saga, ...args) =>
//   fork(function*() {
//     while (true) {
//       const action = yield take(pattern);
//       yield fork(saga, ...args.concat(action));
//     }
//   }
// );

export default loginSaga