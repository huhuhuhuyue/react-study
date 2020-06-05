import React,{ Component } from 'react'
import context from './context'

const Provider = context.Provider
export default class Router extends Component {
  // match初始值是根路径，用法来源于源码，源码位置node_modules\react-router\modules\Router.js
  // 要给
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
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
    // login page页面需要从props上取location，所以要把location传下去
    // useRouteMatch中需要使用match，所以给match一个初始值
    return <Provider 
      value={{
        history: this.props.history, 
        location: this.state.location, 
        match: Router.computeRootMatch(this.state.location.pathname)
    }}>
      {this.props.children}
    </Provider>
  }
}
