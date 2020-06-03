import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import IndexPage from './IndexPage'
import LoginPage from './LoginPage'
import UserPage from './UserPage'
import NotFindPage from './NotFindPage'
export default class ReactRouterPage extends Component {
  render() {
    return (
      <div>
        ReactRouterPage
        <br/>

        {/* 使用路由最外层一定要包一个Router组件 */}
        <Router>
          <Link to='/'>首页</Link>
          <Link to='/login'>登录</Link>
          <Link to='/user'>用户</Link>
          <Switch>
            <Route exact path='/' component={IndexPage}></Route>
            <Route path='/login' component={LoginPage}></Route>
            <Route path='/user' component={UserPage}></Route>
            <Route component={NotFindPage}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
