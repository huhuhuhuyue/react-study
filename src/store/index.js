// import {createStore, applyMiddleware, combineReducers} from "redux";
// import isPromise from 'is-promise'; // 判断是否是promise
// 引入中间件
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from 'redux-promise'

import {createStore, applyMiddleware, combineReducers} from "../kRedux/index";
// console.log(createStore)

// console.log(combineReducers) // 源码：https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts

// reducer是一个方法，接收两个参数state和action
const counterReducer = (state = 0, {type, payload = 1}) => {
  switch (type) {
    case "ADD":
      return state + payload;
      //如果state是对象
      // return {...state, ...newState};
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};
const numReducer = (state = 0, {type, payload = 1}) => {
  switch (type) {
    case "NUMADD":
      return state + payload;
    case "NUMMINUS":
      return state - payload;
    default:
      return state;
  }
};
const toggleReducer = (state = true, {type}) => {
  switch (type) {
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
};
// 使用中间件：把中间件作为参数传递给applyMiddleware方法
// 中间件是有顺序的
// const store = createStore(counterReducer, applyMiddleware(thunk, promise, logger))
// 项目中会有多个reducer，当存在多个reducer时使用combineReducers
const store = createStore(combineReducers({counterReducer, numReducer, toggleReducer}), applyMiddleware(thunk, promise, logger))

// 实现一个logger中间件
// function logger (stateApi) {
//   const {getState} = stateApi
//   // console.log(stateApi) // {getState: ƒ, dispatch: ƒ}
//   return (nextDispatch) => {
//     // console.log(nextDispatch) // dispatch(action) { //... }
//     return (action) => {
//       // console.log(action)  // {type: "ADD", payload: 100}
//       console.log('------------------------------')
//       console.log('action type：', action.type)
//       console.log('prev state：', getState())
//       console.log('action：', action)
//       // 执行dispatch
//       nextDispatch(action)
//       console.log('next state：', getState())
//       console.log('------------------------------')
//     }
//   }
// }

// 实现一个thunk中间件
// function thunk (stateApi) {
//   const {getState, dispatch} = stateApi
//   // console.log(stateApi) // {getState: ƒ, dispatch: ƒ}
//   return (nextDispatch) => {
//     // console.log(nextDispatch) // dispatch(action) { //... }
//     return (action) => {
//       if (typeof action === 'function') {
//         // 当action是个函数时，该函数接收2个参数，即dispatch和getState，
//         // 使用：\src\pages\reduxPage\ReduxPage.js文件中的28行
//         return action(dispatch, getState)
//       } else {
//         return nextDispatch(action)
//       }
//     }
//   }
// }

// 实现一个promise中间件
// function promise (stateApi) {
//   const {dispatch} = stateApi
//   // console.log(stateApi) // {getState: ƒ, dispatch: ƒ}
//   return (nextDispatch) => {
//     // console.log(nextDispatch) // dispatch(action) { //... }
//     return (action) => {
//       // 如果action是promise，执行promise的then方法，否则直接执行nextDispatch(action)
//       return isPromise(action) ? action.then(dispatch) : nextDispatch(action)
//     }
//   }
// }

export default store;