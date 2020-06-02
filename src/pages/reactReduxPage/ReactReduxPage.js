import React, { Component } from 'react'
// import store from '../../store/index'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


// connect是一个高阶函数，可以用装饰器的写法装饰类
// @connect()之后，this.props上面有了dispatch方法
// connect方法还可以接收三个参数，分别是mapStateToProps、mapDispatchToProps、mergeProps
@connect(
  // ---------- mapStateToProps，方法，接收一个state，返回一个state，映射之后可以在props上取到reducer
  // 可以在返回的对象中为counterReducer重命名，如：{counter: state.counterReducer}
  // 简写：({counterReducer}) => ({counterReducer})
  (state) => ({
    numReducer: state.numReducer,
    toggleReducer: state.toggleReducer
  }),
  // ---------- mapDispatchToProps，对象 | 方法，
  // mapDispatchToProps是对象的情况，无法让add、minus和dispatch共存，导致this.props.dispatch({type: 'TOGGLE'})不可用
  // 想让映射的方法和dispatch共存，可以使用函数写法
  // 写法一：对象
  // {
  //   add: () => ({
  //     type: 'NUMADD'
  //   }),
  //   minus: () => ({
  //     type: 'NUMMINUS'
  //   })
  // }
  // 写法二：函数
  dispatch => {
    // 用法一
    // const add = () => ({type: 'NUMADD'})
    // const minus = () => ({type: 'NUMMINUS'})
    // return {dispatch, add, minus}
    // 用法二：
    let creators = {
      add: () => ({type: 'NUMADD'}),
      minus: () => ({type: 'NUMMINUS'})
    }
    creators = bindActionCreators(creators, dispatch)
    return {dispatch, ...creators}
  },
  // ---------- mergeProps 函数
  (stateProps, dispatchProps, ownProps) => {
    // console.log(stateProps) // {numReducer: 0, toggleReducer: true}
    // console.log(dispatchProps) // {dispatch: ƒ, add: ƒ, minus: ƒ}
    // console.log(ownProps) // {name: "cc"} 自身的props，即父组件传来的props
    // 合并props，可以为props对象增加属性
    return {...stateProps, ...dispatchProps, ...ownProps, omg: 'omg'}
  }
)
class ReduxPage extends Component {
  toggle = () => {
    this.props.dispatch({type: 'TOGGLE'})
  }

  // 使用mapDispatchToProps将dispatch映射到props之后，props上就没有dispatch了，this.numAdd方法会通过触发dispatch改变数据，所以this.numAdd就不能用了
  // numMinus = () => {
  //   this.props.dispatch({type: 'NUMMINUS', payload: 1})
  // }
  // numAdd = () => {
  //   this.props.dispatch({type: 'NUMADD', payload: 1})
  // }
  
  // 使用react-redux不需要订阅和取消订阅

  render() {
    console.log(this.props)
    return (
      <div>
        <p>redux-react Page</p>
        <button onClick={this.props.minus}>props numMinus</button>
        {this.props.numReducer}
        {/*使用mapDispatchToProps将dispatch映射到props之后，props上就没有dispatch了，this.numAdd方法会通过触发dispatch改变数据，所以this.numAdd就不能用了*/}
        {/*<button onClick={this.numAdd}>dispatch numAdd</button>*/}
        <button onClick={this.props.add}>props numAdd</button>
        <br/>
        <br/>
        <button onClick={this.toggle}>点击</button>
        {this.props.toggleReducer ? 'true' : 'false'}
      </div>
    )
  }
}
export default ReduxPage