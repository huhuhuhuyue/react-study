import React from 'react'
// import {Route, Redirect} from 'react-router-dom'
import {Route, Redirect} from '../../kReactRouterDom/index'
import { connect } from 'react-redux'
// import { connect } from '../../kReactRedux/index'

// 参数是一个对象：{history: {…}, location: {…}, match: {…}, staticContext: undefined}
export default connect(
  // 通过mapStateToProps将isLogin传给函数组件
  (state) => {
    return {isLogin: state.loginReducer}
  }
)(function PrivateRoute({isLogin, component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        (props) => (
          // 如果isLogin为true，跳转至Component页面，即用户要打开的页面
          // 如果isLogin为false，跳转至login页面，并且将用户要打开页面地址传到login页面，当在login页面登录成功后自动跳转至用户要打开的页面
          isLogin ? 
          (<Component {...props}/>) : 
          (<Redirect to={{
            pathname: '/login',
            state: {redirect: props.location.pathname}
          }} />)
        )
      }
    />
  )
})