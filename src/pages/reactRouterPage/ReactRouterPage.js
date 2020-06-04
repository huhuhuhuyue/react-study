import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import IndexPage from './IndexPage'
import LoginPage from './LoginPage'
import UserPage from './UserPage'
import NotFindPage from './NotFindPage'
import ProductPage from './ProductPage'
import PrivateRoute from './PrivateRoute'
export default class ReactRouterPage extends Component {
  render() {
    return (
      <div>
        ReactRouterPage
        <br/>

        {/* 使用路由最外层一定要包一个Router组件 */}
        <Router>
          <Link to='/'>首页 | </Link>
          <Link to='/login'>登录 | </Link>
          <Link to='/user'>用户 | </Link>
          {/* 动态路由：在路由地址后加/1传递参数 */}
          <Link to='/product/1'>产品1 | </Link>
          <Link to='/product/2'>产品2 |</Link>
          <Switch>
            {/**
             * 路由的三种匹配模式：children、component、render
             * 三者是互斥的
             * 优先级：children > component > render
             * 区别：
             *    1、children和render都是函数，component是组件；
             *    2、如果没有Switch，不管path是否匹配children都会渲染，而component和render只有匹配时才会渲染
             */}
            <Route
              exact
              path='/'
              children = {() => <div>children page</div>}
              component={IndexPage}
              render = {() => <div>render page</div>}
            ></Route>
            
            {/** 定义了component={LoginPage}>之后，Route中又有子元素的话，子元素生效，定义的component不生效 */}
            { /* <Route path='/login' component={LoginPage}>
              <p> 我是login page </p>
              <p> 我是login page </p>
            </Route> */}
            <Route path='/login' component={LoginPage}></Route>

            {/* <Route path='/user' component={UserPage}></Route> */}
            {/* 使用PrivateRoute做路由拦截 */}
            <PrivateRoute path='/user' component={UserPage}></PrivateRoute>
            
            {/* 在路由地址后加/:id接收参数 */}
            <Route path='/product/:id' component={ProductPage}></Route>
            <Route component={NotFindPage}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
