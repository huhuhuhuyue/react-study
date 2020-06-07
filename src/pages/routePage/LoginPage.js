import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../action/login'

// 将loginInfo和login方法映射到props上
@connect(
  (store) => ({loginInfo: store.asyncLoginReducer}),
  {
    // login: (payload) => ({type: 'ASYNCLOGINSUCESS', payload})
    login
  }
)
class LoginPage extends Component {
  state = {
    name: ''
  }
  render() {
    // console.log(this.props)
    const {loginInfo, location} = this.props
    // 如果已登录，重定向到上一个页面传来的location.state.redirect页面
    // console.log(loginInfo) // {isLogin: false, username: ""}
    if (loginInfo.isLogin) return <Redirect to={location.state ? location.state.redirect || '/' : '/'}></Redirect>
    // 否则让用户登录
    return (
      <div>
        <p>LoginPage</p>
        <input type='text' onChange={(e) => this.setState({name: e.target.value})}/>
        {/* 点击按钮先去dispatch({type: 'REQUEST'})，获取到loginInfo.loading，给用户展示一个loading状态 */}
        <button onClick={() => this.props.login(this.state.name)}>{loginInfo.loading ? 'loading' : '登录'}</button>
        <p style={{color: 'red'}}>{loginInfo.err && loginInfo.err.msg}</p>
      </div>
    )
  }
}
export default LoginPage
