import React, { Component } from 'react'
import store from '../../store/index'
/**
 * console.log(store)
 * dispatch: ƒ dispatch(action)
 * getState: ƒ getState()
 * replaceReducer: ƒ replaceReducer(nextReducer)
 * subscribe: ƒ subscribe(listener)
 * Symbol(observable): ƒ observable() 
*/
export default class ReduxPage extends Component {
  minus = () => {
    store.dispatch({type: 'MINUS', payload: 100})
  }
  promiseMinus = () => {
    store.dispatch(Promise.resolve({
      type: 'MINUS', payload: 100
    }))
  }
  add = () => {
    store.dispatch({type: 'ADD', payload: 100})
  }
  asyncAdd = () => {
    // 如果给store.dispatch传入一个函数就不能执行了
    // Redux只是个纯粹的状态管理器，默认只⽀持同步，实现异步任务 ⽐如延迟，⽹络请求，需要中间件的⽀持，⽐如我们使⽤最简单的redux-thunk和redux-logger 
    // 不使用redux-thunk下面代码不能执行
    // store.dispatch(() => {
    //   setTimeout(() => {
    //     store.dispatch({type: 'ADD', payload: 100})
    //   }, 1000)
    // })
    // 使用redux-thunk后，dispatch的参数可以是函数，函数接收两个参数，dispatch和getState
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        // console.log(store.getState())
        dispatch({type: 'ADD', payload: 100})
      }, 1000)
    })
  }
  
  // store里面的值发生变化，不会重新渲染页面，因为store只负责管理页面
  componentDidMount () {
    // subscribe订阅，返回一个取消订阅的方法
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate() // 强制更新页面
    })
  }
  // 有订阅就要取消订阅，不然组件卸载再次挂载后，执行store.subscribe报错
  componentWillUnmount () {
    // 如果this.unsubscribe存在，执行this.unsubscribe()
    this.unsubscribe && this.unsubscribe()
  }

  render() {
    return (
      <div>
        <p>redux Page</p>
        <button onClick={this.minus}> minus </button>
        <button onClick={this.promiseMinus}> promiseMinus </button>
        {/*只有一个reducer时的用法*/}
        {/*{store.getState()}*/}
        {/*存在多个reducer时的用法*/}
        {store.getState().counterReducer}
        <button onClick={this.add}> add </button>
        <button onClick={this.asyncAdd}> asyncAdd </button>
      </div>
    )
  }
}
