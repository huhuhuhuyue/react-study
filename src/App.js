import React, {useState} from 'react';
import './App.css'
// import ComponentCommunication from './pages/componentCommunication/ComponentCommunication'
// import {HocIndex} from './pages/hoc/HocIndex'
// import DecoratorIndex from './pages/decorator/DecoratorIndex'
// import MyRcForm from './pages/MyRcForm'
// import CommonDialog from './pages/commonDialog/commonDialog'
import ReduxPage from './pages/reduxPage/ReduxPage'
function App() {
  // 使用useState的话1会console两次
  let [showDialog, setShowDialog] = useState(true)
  return (
    <div className="App">
      {/*<ComponentCommunication/>*/}
      {/*<HocIndex name='cc'/>*/}
      {/*<DecoratorIndex name='zz'/>*/}
      {/*<MyRcForm/>*/}

      <button onClick={() => setShowDialog(!showDialog)}>showDialog dialog</button>
      {/**渲染出来的CommonDialog在app下，我们希望他是全局的，和app平级 */}
      {/* {showDialog && <CommonDialog msg='app msg'/>} */}

      {/* ReduxPage */}
      {showDialog && <ReduxPage/>}
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