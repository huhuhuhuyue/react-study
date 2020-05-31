export default function applyMiddleware (...middlewares) {
  // console.log(middlewares) // 数组，每一项都是一个函数
  return (createStore) => {
    return (reducer) => {
      const store = createStore(reducer)
      // 获取到初始的dispatch并赋值给变量dispatch
      let dispatch = store.dispatch

      const api = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      // 中间件可以拿到action、初始值、改变后的值，是调用的时候传过去的，所有把api对象传给中间件mw
      const middlewareChain = middlewares.map( mw => mw(api))
      // middlewareChain是一个数组，数组中的每一项分别的middlewares中每一项调用的返回值，返回值依然是一个函数

      // 加强版的dispatch
      dispatch = compose(...middlewareChain)(dispatch)

      // 不管有没有applyMiddleware，都要返回一个对象，对象中有dispatch、getState、subscribe三个方法
      return {
        ...store,
        dispatch // 后面的dispatch会覆盖前面的
      }
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // return funcs.reduce((a, b) => (...args) => a(b(...args)));
  return funcs.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    }
  })
}