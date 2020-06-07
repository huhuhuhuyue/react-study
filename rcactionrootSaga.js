[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex b184392..4a8af01 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -9,10 +9,11 @@[m [mimport './App.css'[m
 // import ReactReduxPage from './pages/reactReduxPage/ReactReduxPage'[m
 // import ReactReduxHookPage from './pages/reactReduxPage/ReactReduxHookPage'[m
 // import UseReducerPage from './pages/reactReduxPage/UseReducerPage'[m
[31m-import ReactRouterPage from './pages/reactRouterPage/ReactRouterPage'[m
[32m+[m[32m// import ReactRouterPage from './pages/reactRouterPage/ReactRouterPage'[m
 // import RoutePage from './pages/reactRouterPage/RoutePage'[m
[32m+[m[32mimport RouteIndex from './pages/routePage/RouteIndex'[m
 [m
[31m-function App() {[m
[32m+[m[32mfunction App(props) {[m
   // 使用useState的话1会console两次[m
   // let [showDialog, setShowDialog] = useState(true)[m
   let [count, setCount] = useState(0)[m
[36m@@ -54,10 +55,13 @@[m [mfunction App() {[m
       {/** <UseReducerPage/> */}[m
 [m
       {/*ReactRouter */}[m
[31m-      <ReactRouterPage/>[m
[32m+[m[32m      {/*<ReactRouterPage/>*/}[m
 [m
       {/* 对比Route三种匹配模式：children、component、render */}[m
       {/* <RoutePage/> */}[m
[32m+[m
[32m+[m[32m      {/* route */}[m
[32m+[m[32m      <RouteIndex></RouteIndex>[m
     </div>[m
   );[m
 }[m
[1mdiff --git a/src/index.js b/src/index.js[m
[1mindex ce9fdfb..b2a97b7 100644[m
[1m--- a/src/index.js[m
[1m+++ b/src/index.js[m
[36m@@ -6,6 +6,8 @@[m [mimport * as serviceWorker from './serviceWorker';[m
 import { Provider } from 'react-redux'[m
 // import { Provider } from './kReactRedux/index'  // 自己写的Provider要和自己写的connect搭配使用，混搭会报错[m
 import store from './store/index'[m
[32m+[m[32mimport "./static/js/flexible";[m
[32m+[m[32mimport "./static/style/iconfont/iconfont.css";[m
 [m
 // <React.StrictMode>会多次执行constructor[m
 // ReactDOM.render([m
[1mdiff --git a/src/kReactRouterDom/Prompt.js b/src/kReactRouterDom/Prompt.js[m
[1mindex f543c63..1a7634b 100644[m
[1m--- a/src/kReactRouterDom/Prompt.js[m
[1m+++ b/src/kReactRouterDom/Prompt.js[m
[36m@@ -9,12 +9,12 @@[m [mexport default function Prompt ({message, when = true }) {[m
         const method = context.history.block[m
         return ([m
           <LiceCycle[m
[31m-          onMount={self => {[m
[31m-            self.release = method(message)[m
[31m-          }}[m
[31m-          onUnmount={self => {[m
[31m-            self.release()[m
[31m-          }}[m
[32m+[m[32m            onMount={self => {[m[41m[m
[32m+[m[32m              self.release = method(message)[m[41m[m
[32m+[m[32m            }}[m[41m[m
[32m+[m[32m            onUnmount={self => {[m[41m[m
[32m+[m[32m              self.release()[m[41m[m
[32m+[m[32m            }}[m[41m[m
           />[m
         )[m
       }}[m
[1mdiff --git a/src/store/index.js b/src/store/index.js[m
[1mindex 9e64994..ff7640c 100644[m
[1m--- a/src/store/index.js[m
[1m+++ b/src/store/index.js[m
[36m@@ -2,12 +2,17 @@[m
 // import isPromise from 'is-promise'; // 判断是否是promise[m
 // 引入中间件[m
 import logger from "redux-logger";[m
[31m-import thunk from "redux-thunk";[m
[32m+[m[32m// import thunk from "redux-thunk";[m[41m[m
 import promise from 'redux-promise'[m
[31m-[m
[32m+[m[32mimport {asyncLoginReducer} from './asyncLogin'[m[41m[m
 import {createStore, applyMiddleware, combineReducers} from "../kRedux/index";[m
 // console.log(createStore)[m
 [m
[32m+[m[32m// import loginSaga from "../action/loginSaga"; // 有一个saga[m[41m[m
[32m+[m[32mimport rootSaga from "../action/rootSaga"; // 有多个saga的使用方式[m[41m[m
[32m+[m[32mimport createSagaMiddleware from "redux-saga"; // 用saga代替redux-thunk[m[41m[m
[32m+[m[32mconst sagaMiddleware = createSagaMiddleware();[m[41m[m
[32m+[m[41m[m
 // console.log(combineReducers) // 源码：https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts[m
 [m
 // reducer是一个方法，接收两个参数state和action[m
[36m@@ -55,7 +60,7 @@[m [mconst loginReducer = (state = false, {type}) => {[m
 // 中间件是有顺序的[m
 // const store = createStore(counterReducer, applyMiddleware(thunk, promise, logger))[m
 // 项目中会有多个reducer，当存在多个reducer时使用combineReducers[m
[31m-const store = createStore(combineReducers({counterReducer, numReducer, toggleReducer, loginReducer}), applyMiddleware(thunk, promise, logger))[m
[32m+[m[32mconst store = createStore(combineReducers({counterReducer, numReducer, toggleReducer, loginReducer, asyncLoginReducer}), applyMiddleware(sagaMiddleware, promise, logger))[m[41m[m
 [m
 // 实现一个logger中间件[m
 // function logger (stateApi) {[m
[36m@@ -108,4 +113,6 @@[m [mconst store = createStore(combineReducers({counterReducer, numReducer, toggleRed[m
 //   }[m
 // }[m
 [m
[32m+[m[41m[m
[32m+[m[32msagaMiddleware.run(rootSaga)[m[41m[m
 export default store;[m
\ No newline at end of file[m
