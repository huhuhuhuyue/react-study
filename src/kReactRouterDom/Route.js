import React, { Component } from 'react'
import context from './context'
import matchPath from './matchPath'

const Provider = context.Provider
export default class Route extends Component {
  render() {
    // console.log(this.props) // {component: ƒ}
    return (
      <context.Consumer>
        {
          (context) => {
            // console.log(context)
            // 如果当前的pathname === this.props.path，渲染this.props.component
            // const math = location.pathname === this.props.path
            // return math ? React.createElement(this.props.component) : null // 简易版

            const {location} = context;
            const {path, children, component, render} = this.props
            // 如果匹配渲染三者之一，如果不匹配渲染children
            // react-route中的matchPath.js文件有个matchPath方法，原来对比path，接受两个参数，分别是现在是pathname和当前的props对象
            // 当path存在时先用matchPath去match，否则就用context的match
            const match = path ? matchPath(location.pathname, this.props) : context.match
            const props = {...context, ...location, match} // 要传递给路由组件的参数，有的页面需要获取match，所以要传下去
            return (
              <Provider value={props}>
                {match
                  ? children
                    ? typeof children === "function"
                      ? children(props)
                      : children
                    : component
                    ? React.createElement(component, props)
                    : render
                    ? render(props)
                    : null
                  : typeof children === "function"
                  ? children(props)
                  : null}
              </Provider>
            );
        }}
      </context.Consumer>
    )
  }
}
