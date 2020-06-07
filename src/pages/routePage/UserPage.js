import React, { Component } from 'react'
import {connect} from 'react-redux'

@connect(
  (store) => ({userInfo: store.asyncLoginReducer})
)
class UserPage extends Component {
  render() {
  // console.log(this.props)
    return (
      <div>
        <p>UserPage</p>
        <p>姓名：{this.props.userInfo.username}</p>
        <p>账号：{this.props.userInfo.id}</p>
        <p>分数：{this.props.userInfo.score}</p>
      </div>
    )
  }
}
export default UserPage