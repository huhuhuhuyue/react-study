import React, {useCallback} from 'react'
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../../kReactRedux/index';

export default function ReactReduxHookPage () {
  // useSelector方法的参数是一个函数，改函数接收combineReducers中的三个reducers，返回一个reducer
  // const num = useSelector( (reducers) => {
  //   // console.log(reducers) // {counterReducer: 0, numReducer: 0, toggleReducer: true}
  //   return reducers.numReducer
  // })
  // 简写
  const num = useSelector( ({numReducer}) => numReducer )
  const toggleReducer = useSelector( ({toggleReducer}) => toggleReducer )
  const dispatch = useDispatch()
  const numAdd = useCallback(() => {
    dispatch({type: 'NUMADD'})
  }, [dispatch])
  const numMinus = useCallback(() => {
    dispatch({type: 'NUMMINUS'})
  }, [dispatch])
  const toggle = useCallback(() => {
    dispatch({type: 'TOGGLE'})
  }, [dispatch])
  return (
    <div style={{paddingTop: '30px'}}>
      ReactReduxHookPage page
      <br/>
      <button onClick={numMinus}>minus</button>
      {num}
      <button onClick={numAdd}>add</button>
      <br/>
      <button onClick={toggle}>点击</button>
      {toggleReducer ? 'true' : 'false'}
    </div>
  )
}
