import React, {useContext, useLayoutEffect, useReducer} from  'react'
import context from './context'
import bindActionCreators from './bindActionCreators'
const connect = (
  mapStateToProps,
  mapDispatchToProps
) => {
  // console.log(mapStateToProps)
  return (Comp) => {
    // console.log(Comp) // ReduxPage类组件，Comp要当做一个类组件去渲染<Comp/>，必须是大写字母开头
    return (props) => {
      // console.log(props) // 父组件传来的pros：{name: "cc", count: 0}
      const store = useContext(context) // {dispatch: ƒ, getState: ƒ, subscribe: ƒ}
      const {getState, dispatch, subscribe} = store
      // console.log(getState()) // {counterReducer: 0, numReducer: 0, toggleReducer: true}
      const stateProps = mapStateToProps(getState())
      let dispatchProps = {dispatch}

      if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch) // 函数形式的mapDispatchToProps，接收一个dispatch参数
      } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch) // 对象形式的mapDispatchToProps，使用bindActionCreators给对象的每一项绑定一个dispatch
      }

      // state变化后不能自动更新页面
      // 在函数组件中没有forceUpdate，所以要使用useReducer定义一个forceUpdate，但是要尽量避免这样使用
      const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
      // 如果使用延时执行的useEffect，订阅可能会丢失，所以使用useLayoutEffect
      useLayoutEffect(() => {
        const unsubscribe = subscribe(() => { // 订阅，返回值是取消订阅的方法
          forceUpdate() // 更新
        })
        return () => (unsubscribe && unsubscribe()) // 返回一个函数，该函数执行取消订阅
      }, [store, ignored, subscribe])
      
      // console.log(stateProps) // {numReducer: 0, toggleReducer: true}
      return <Comp {...props} {...stateProps} {...dispatchProps}/>
    }
  }
}

export default connect