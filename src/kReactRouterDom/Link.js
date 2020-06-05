import React, { Component } from 'react'
// import {createBrowserHistory} from 'history' // 从props中获取history
import context from './context'

export default class Link extends Component {
  static contextType = context
  // 为了防止a标签跳转页面刷新，要定义一个方法阻止a标签的默认行为，并通过history实现跳转
  handlerClick = (event) => {
    event.preventDefault()

    // 从props中获取history就不用createBrowserHistory了
    // const history = createBrowserHistory()
    this.context.history.push(this.props.to)
  }
  render() {
    return <a href={this.props.to} onClick={this.handlerClick}>{this.props.children}</a>
  }
}
