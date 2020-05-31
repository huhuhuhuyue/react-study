// createStore接收reducer作为第一个参数，第二个参数enhancer是调用applyMiddleware方法的返回值
export default function createStore (reducer, enhancer) {
  // console.log(reducer)

  // 如果有加强器
  // console.log(enhancer)
  if (enhancer) {
    // enhancer依然是一个函数
    // 加强器要加强的是dispatch，dispatch来源于createStore，所以要把createStore传给enhancer
    // 加强之后依然要处理action，action来源于reducer，所以要把reducer传过去
    return enhancer(createStore)(reducer)
  }

  // 定义变量保存当前state
  let currentState
  // 保存订阅数组
  let currentListeners = []

  // 返回当前state
  function getState () {
    return currentState
  }

  // 接收一个对象作为参数store.dispatch({type: 'MINUS'})
  // 目的是改变state，即currentState
  // 改变state的是reducer
  // reducer接收两个参数，即当前的state和action
  function dispatch (action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach((lis) => {lis()})
    return action
  }

  // 订阅，返回一个取消订阅的函数
  function subscribe (listener) {
    // 将listener保存起来，listener需要在dispatch时执行
    currentListeners.push(listener)
    return () => {
      // 直接从currentListeners数组中删除listener即可
      currentListeners.splice(currentListeners.indexOf(listener), 1)
    }
  }

  // 由于初次渲染时候页面没有state初始值，所以要手动调用一下，要确保type和用户写的不重复，源码中是生成的随机字符串
  dispatch({type: Math.random() + ''})

  return {
    dispatch,
    getState,
    subscribe
  }
}