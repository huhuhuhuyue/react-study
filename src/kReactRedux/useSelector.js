import {useReducer, useLayoutEffect} from 'react'
import useStore from './useStore'
export default function useSelector(selector) {
  const {getState, subscribe} = useStore()  // useStore()的返回值是对象：{dispatch: ƒ, getState: ƒ, subscribe: ƒ}

  // state变化后不能自动更新页面
  // 在函数组件中没有forceUpdate，所以要使用useReducer定义一个forceUpdate，但是要尽量避免这样使用
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  // 如果使用延时执行的useEffect，订阅可能会丢失，所以使用useLayoutEffect
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => { // 订阅，返回值是取消订阅的方法
      forceUpdate() // 更新
    })
    return () => (unsubscribe && unsubscribe()) // 返回一个函数，该函数执行取消订阅
  }, [ignored, subscribe])

  // console.log(selector) // ({numReducer}) => numReducer
  // console.log(getState()) // {counterReducer: 0, numReducer: 0, toggleReducer: true}
  // useSelector的参数selector是一个方法，该方法的参数是所有state，即getState()，返回一个state
  return selector(getState())
}
