import React, { Component } from 'react'
import context from './context'
import matchPath from './matchPath'
export default class Route extends Component {
  render() {
    // console.log(this.props) // {component: ƒ}
    return (
      <context.Consumer>
        {
          (context) => {
            // console.log(context)
            // 如果当前的pathname === this.props.path，渲染this.props.component
            // const math = context.history.location.pathname === this.props.path
            // react-route中的matchPath.js文件有个matchPath方法，原来对比path，接受两个参数，分别是现在是pathname和当前的props对象
            const math = matchPath(context.history.location.pathname, this.props)
            return math ? React.createElement(this.props.component) : null
          }
        }
      </context.Consumer>
    )
    // return this.props.component()

  }
}
