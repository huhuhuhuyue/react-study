import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
// import { Provider } from './kReactRedux/index'  // 自己写的Provider要和自己写的connect搭配使用，混搭会报错
import store from './store/index'
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";

// <React.StrictMode>会多次执行constructor
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// 使用redux时
// ReactDOM.render(<App />, document.getElementById("root"));

// 使用react-redux
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
