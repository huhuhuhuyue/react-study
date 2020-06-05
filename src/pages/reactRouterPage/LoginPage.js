import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'
import { Redirect} from '../../kReactRouterDom/index'
import { connect } from 'react-redux'
// import { connect } from '../../kReactRedux/index'
@connect(
  (state) => {
    return {isLogin: state.loginReducer}
  },
  {
    login: () => ({type: 'LOGINSUCESS'})
  }
)
class LoginPage extends Component {
  render() {
    // console.log(this.props) // {history: {…}, location: {…}, match: {…}, staticContext: undefined}
    // 从props.location.state中获取redirect，即上一个页面传来的登录成功要去的路由，如果上个页面没有传使用默认值'/'
    const {redirect = '/'} = this.props.location.state || {}
    // 如果登陆成功跳转到redirect指定的页面
    if (this.props.isLogin) {
      return <Redirect to={redirect}/>
    }
    return (
      <div>
        LoginPage
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
export default LoginPage
