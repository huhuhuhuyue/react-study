// 同步写法
// export const login = (payload) => ({type: 'ASYNCLOGINSUCESS', payload})

// thunk异步写法一
// import LoginService from '../service/login'
// 不需要嵌套回调函数
// export const login = (payload) => {
//   return (dispatch) => {
//     // 点击按钮先去dispatch({type: 'REQUEST'})，获取到loginInfo.loading，给用户展示一个loading状态，再去请求接口，接口成功后触发ASYNCLOGINSUCESS
//     dispatch({type: 'REQUEST'})
//     LoginService.login(payload).then(
//       res => {
//         // 如果成功，触发ASYNCLOGINSUCESS
//         dispatch({type: 'ASYNCLOGINSUCESS', payload})
//       },
//       err => {
//         dispatch({type: 'ASYNCLOGINFAILURE', payload: err})
//       }
//     )
//   }
// }

// thunk异步写法二
// 有时候第二个接口需要用第一个接口的返回值作为入参
// export const login = (payload) => {
//   return async (dispatch) => {
//     dispatch({type: 'REQUEST'})
//     const res = await loginPromise(dispatch, payload)
//     // console.log(res) // {id: 123, username: "omg原来是小明"}
//     res && getMoreUserInfo(dispatch, res) // 如果loginPromise走到err里面，res是undefined，所以要判断
//   }
// }
// const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     res => {
//       // dispatch({type: LOGIN_SUCCESS, payload: {...res}});
//       return res;
//     },
//     err => {
//       dispatch({type: 'ASYNCLOGINFAILURE', payload: err})
//     }
//   );
// };
// const getMoreUserInfo = (dispatch, userInfo) => {
//   return LoginService.getMoreUserInfo(userInfo).then(
//     res => {
//       dispatch({type: 'ASYNCLOGINSUCESS', payload: res});
//       return res;
//     },
//     err => {
//       dispatch({type: 'ASYNCLOGINFAILURE', payload: err});
//     }
//   );
// };


// saga写法
export const login = payload => ({type: 'LOGINSAGA', payload});
