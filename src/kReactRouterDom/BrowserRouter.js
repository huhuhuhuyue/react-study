import React, { Component } from 'react'
import Router from './Router'
import {createBrowserHistory} from 'history' // history是默认安装的

// BrowserRouter、hashRouter都是基于Router的
export default class BrowserRouter extends Component {
  constructor (props) {
    super(props)
    // console.log(this.props)
    this.history = createBrowserHistory()
    // console.log(this.history) // {length: 5, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
  }
  render() {
    return (
      <Router history={this.history}> {this.props.children} </Router>
    )
  }
}

// BrowserRouter、HashRouter、MemoryRouter实现时的区别
// BrowserRouter使用createBrowserHistory()
// HashRouter使用createHashHistory()
// MemoryRoute使用createMemoryHistory()

