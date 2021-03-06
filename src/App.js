import React, {useState} from 'react';
import './App.css'
// import ComponentCommunication from './pages/componentCommunication/ComponentCommunication'
// import {HocIndex} from './pages/hoc/HocIndex'
// import DecoratorIndex from './pages/decorator/DecoratorIndex'
// import MyRcForm from './pages/MyRcForm'
// import CommonDialog from './pages/commonDialog/commonDialog'
// import ReduxPage from './pages/reduxPage/ReduxPage'
// import ReactReduxPage from './pages/reactReduxPage/ReactReduxPage'
// import ReactReduxHookPage from './pages/reactReduxPage/ReactReduxHookPage'
// import UseReducerPage from './pages/reactReduxPage/UseReducerPage'
// import ReactRouterPage from './pages/reactRouterPage/ReactRouterPage'
// import RoutePage from './pages/reactRouterPage/RoutePage'
import RouteIndex from './pages/routePage/RouteIndex'

function App(props) {
  // 使用useState的话1会console两次
  // let [showDialog, setShowDialog] = useState(true)
  let [count, setCount] = useState(0)
  return (
    <div className="App">

      <p>
        {count}
        <button onClick={() => setCount(count + 1)}>add count</button>
      </p>

      {/* 组件通讯 */}
      {/*<ComponentCommunication/>*/}

      {/* 高阶组件 */}
      {/*<HocIndex name='cc'/>*/}

      {/* 装饰器 */}
      {/*<DecoratorIndex name='zz'/>*/}

      {/*<MyRcForm/>*/}

      {/*<button onClick={() => setShowDialog(!showDialog)}>showDialog dialog</button>*/}

      {/*全局弹窗组件*/}
      {/**渲染出来的CommonDialog在app下，我们希望他是全局的，和app平级 */}
      {/* {showDialog && <CommonDialog msg='app msg'/>} */}

      {/* Redux */}
      {/*{showDialog && <ReduxPage/>}*/}

      {/** ReactRedux */}
      {/*<ReactReduxPage name='cc' count={count}/>*/}

      {/** ReactReduxHook */}
      {/*<ReactReduxHookPage/>*/}

      {/** UseReducer */}
      {/** <UseReducerPage/> */}

      {/*ReactRouter */}
      {/*<ReactRouterPage/>*/}

      {/* 对比Route三种匹配模式：children、component、render */}
      {/* <RoutePage/> */}

      {/* route */}
      <RouteIndex></RouteIndex>
    </div>
  );
}
export default App;

// ----------------------------class组件改变state用法：------------------------------------
// import React, { Component } from 'react'
// import CommonDialog from './pages/commonDialog/commonDialog'
// export default class App extends Component {
//   state = {
//     showDialog: false
//   }
//   render() {
//     return (
//       <div>
//       <button onClick={() => this.setState({showDialog: !this.state.showDialog})}>showDialog dialog</button>
//       {/**渲染出来的CommonDialog在app下，我们希望他是全局的，和app平级 */}
//       {this.state.showDialog && <CommonDialog msg='app msg'/>}
//       </div>
//     )
//   }
// }

// ----------------------------reduce------------------------------------
// reduce接收2个参数，第一个是函数，第二个是初始值（可选，不传初始值时，初始值是数组的第一项）
/** 函数接收四个参数：
 * total：必需。初始值, 或者上次计算后的值
 * currentValue：本次循环的元素
 * currentIndex：本次循环的索引
 * arr：整个数组
*/
// const arr = [1, 2, 3, 4];
// let res = arr.reduce((total, currentValue, currentIndex, arr) => {
//   console.log(total, currentValue, currentIndex, arr)
//   return total + currentValue
// }, 0) 
// console.log(res)

// function f1(arg) {
//   console.log("f1", arg);
//   return arg;
// }
// function f2(arg) {
//   console.log("f2", arg);
//   return arg;
// }
// function f3(arg) {
//   console.log("f3", arg);
//   return arg;
// }

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   // return funcs.reduce((a, b) => (...args) => a(b(...args)));
//   return funcs.reduce((a, b) => {
//     console.log('1111', a, b)
//     return (...args) => {
//       // console.log('2222', args) // 'omg'
//       return a(b(...args));
//     };
//   });
// }

// let res = compose(f1, f2, f3)("omg"); // 相当于f1(f2(f3("omg")));

// console.log("res", res); //sy-log