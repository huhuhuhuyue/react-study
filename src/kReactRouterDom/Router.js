import React,{ Component } from 'react'
import context from './context'

const Provider = context.Provider
export default class Router extends Component {
  constructor(props) {
    super(props)
    // 路由发生变化后，页面不会重新渲染，要把location存在state里，当路由变化时改变state，出发子组件重新渲染
    this.state = {
      location: props.history.location
    }
    // history有一个listion方法，接受一个函数作为参数，这个函数又接收location作为参数，所以当location发生变化时，改变state中的location，触发子组件重新渲染，相当于订阅
    this.unlisten = this.props.history.listen((location) => {
      this.setState({location})
    })
  }
  // 取消订阅
  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }
  
  render() {
    return <Provider value={{history: this.props.history}}>{this.props.children}</Provider>
  }
}
