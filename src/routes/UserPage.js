import React, { Component } from 'react'
import { connect } from 'dva'
@connect(
  // mapStateToProps，接收一个state，返回一个新的state
  (state) => {
    console.log(state) // {routing: {…}, @@dva: 0, example: {…}}
    return state
  }
)
export default class UserPage extends Component {
  render() {
    console.log('user', this.props)
    return (
      <div>
        UserPage
      </div>
    )
  }
}
