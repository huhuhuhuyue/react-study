import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

// loginInfo.isLogin是从store里取的，store是通过Provider传递下来的，所以要用connect映射到props上
export default connect(
  (store) => ({loginInfo: store.asyncLoginReducer})
)(function PrivateRoute ({loginInfo, component: Component, ...rest}) {
  return (
    <Route 
      {...rest}
      render = {
        (props) => {
          // console.log(props)
          // 如果已登录，跳转至Component，即UserPage，否则跳转至登录页
          return loginInfo.isLogin ? <Component {...props}/> : <Redirect to={{pathname: 'login', state: {redirect: props.location.pathname}}}/>
        }
      }
    ></Route>
  )
})
