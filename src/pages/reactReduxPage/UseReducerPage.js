import React, {useReducer, useEffect, useLayoutEffect} from 'react'
import {numReducer} from '../../store/index'
export default function UseReducerPage () {
  // useReducer用法类似于useState，接收了三两个参数，分别是reducer、state的初始值、init方法，返回当前reducer的state和dispatch
  // init方法接收state的初始值作为参数，即useReducer的第二个参数，返回处理过后的state
  const init = (initialValue) => initialValue / 2 // 初始值变成了init的返回值
  const [state, dispatch] = useReducer(numReducer, 10, init)

  // useEffect接收两个参数，第一个是要执行的函数，第二个是依赖项（可选）
  // 如果没有依赖项，页面每次重新渲染useEffect都会执行；如果有依赖项，就在依赖项发生变化时useEffect执行；如果只需要执行一次，依赖项可是一个空数组
  // 相当于类组件的componentDidMount、componentDidUpdate、componentWillUnmount
  // useEffect是延迟执行的，在每轮渲染结束后执行，如果必须同步执行应该使用useLayoutEffect
  useEffect(() => {
    console.log('useEffect')
  }, [])
  useLayoutEffect(() => {
    console.log('useLayoutEffect') // 在useEffect之前执行
  }, [])

  return <div style={{paddingTop: '30px'}}>
    UseReducerPage
    <button onClick={() => dispatch({type: 'NUMMINUS', payload: 1})}>-</button>
    {state}
    <button onClick={() => dispatch({type: 'NUMADD', payload: 1})}>+</button>
  </div>
}