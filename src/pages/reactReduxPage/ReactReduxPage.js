import React, { Component } from 'react'
// import store from '../../store/index'
// import { connect } from 'react-redux'
import { connect } from '../../kReactRedux/index'
// import {bindActionCreators} from 'redux'
import {bindActionCreators} from '../../kReactRedux/index'


// connect是一个高阶函数，可以用装饰器的写法装饰类
// @connect()之后，this.props上面有了dispatch方法
// connect方法还可以接收三个参数，分别是mapStateToProps、mapDispatchToProps、mergeProps
@connect(
  // ---------- mapStateToProps，方法，接收一个state和ownProps（可选），返回一个state，映射之后可以在props上取到reducer
  // 如果接收了ownProps，父组件传来了props发生变化时会重新执行，所以如果方法不依赖自身的props时候就不要接收这个参数
  // 可以在返回的对象中为counterReducer重命名，如：{counter: state.counterReducer}
  // 简写：({counterReducer}) => ({counterReducer})
  state => {
    // console.log('mapStateToProps')
    return {
      numReducer: state.numReducer,
      toggleReducer: state.toggleReducer
    }
  },
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
  // },
  // 写法二：函数，接收dispatch、ownProps（可选）
  // 如果接收了ownProps，父组件传来了props发生变化时会重新执行，所以如果方法不依赖自身的props时候就不要接收这个参数
  dispatch => {
    // console.log('mapDispatchToProps')
    // 用法一
    // const add = () => ({type: 'NUMADD'})
    // const minus = () => ({type: 'NUMMINUS'})
    // return {dispatch, add, minus}
    // 用法二：
    let creators = {
      add: (payload) => ({type: 'NUMADD', payload}),
      minus: (payload) => ({type: 'NUMMINUS', payload})
    }
    creators = bindActionCreators(creators, dispatch)
    // 用法三：如果不想用bindActionCreators，可以使用dispatch
    // let creators = {
    //   add: () => dispatch({type: 'NUMADD'}),
    //   minus: () => dispatch({type: 'NUMMINUS'})
    // }
    return {dispatch, ...creators}
  },
  // ---------- mergeProps 函数
  // 参数一是mapStateToProps映射到props上的stateProps
  // 参数二是mapDispatchToProps映射到props上的dispatchProps
  // 参数三是组件自身的props，即父组件传来的props
  // 不管是否接收了ownProps，父组件传来的props发生变化时mergeProps都会再次执行
  // 如果mergeProps返回的对象不包括ownProps，this.props上就没有父组件传来的props
  (stateProps, dispatchProps, ownProps) => {
    // console.log('mergeProps')
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
        <p>姓名：{this.props.name}、count：{this.props.count}</p>
        <button onClick={() => this.props.minus(100)}>props numMinus</button>
        {this.props.numReducer}
        {/*使用mapDispatchToProps将dispatch映射到props之后，props上就没有dispatch了，this.numAdd方法会通过触发dispatch改变数据，所以this.numAdd就不能用了*/}
        {/*<button onClick={this.numAdd}>dispatch numAdd</button>*/}
        <button onClick={() => this.props.add(100)}>props numAdd</button>
        <button onClick={() => this.props.dispatch({type: 'NUMADD'})}>dispatch numAdd</button>
        <br/>
        <br/>
        <button onClick={this.toggle}>点击</button>
        {this.props.toggleReducer ? 'true' : 'false'}
      </div>
    )
  }
}
export default ReduxPage