import React, { Component, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

export default class RoutePage extends Component {
  constructor () {
    super()
    this.state = {
      num: 1
    }
  }
  
  render() {
    return (
      <div>
        <p>RoutePage</p>
        <button onClick={() => this.setState({num: this.state.num + 1})}>{this.state.num}</button>

        <Router>
          {/* ---------- children：正确示范，如果不管path是否匹配都需要渲染就选children ---------- */}
          {/* 组件挂载时componentDidMount执行一次，num发生变化时componentDidMount不执行 */}
          <Route children={() => <ClassChild num={this.state.num}/>}/>
          {/* 如果useEffect的依赖项是[]，组件挂载时useEffect执行一次；
          如果useEffect的依赖项是[num],每次num发生变化时useEffect都会重新执行 */}
          <Route children={() => <FunctionChild num={this.state.num}/>}/>

          {/* ---------- component：错误示范 ---------- */}
          {/* 组件挂载时执行componentDidMount，每次num发生变化时先执行卸载componentWillUnmount，再执行挂载componentDidMount。 
          因为component是使用React.createElement渲染页面的，component每次传入一个匿名函数，对于React.createElement来说每次都是不用的函数，所以无法复用，只能重新渲染
          */}
          {/* <Route component={() => <ClassChild num={this.state.num}/>}/> */}
          {/* 组件挂载时执行useEffect，每次num发生变化时useEffect都会重新执行 */}
          {/* <Route component={() => <FunctionChild num={this.state.num}/>}/> */}

          {/* ---------- render：正确示范，如果需要path匹配时候才渲染就选render ---------- */}
          {/* 组件挂载时componentDidMount执行一次，num发生变化时componentDidMount不执行 */}
          {/* <Route render={() => <ClassChild num={this.state.num}/>}/> */}
          {/* 如果useEffect的依赖项是[]，组件挂载时useEffect执行一次；
          如果useEffect的依赖项是[num],每次num发生变化时useEffect都会重新执行 */}
          {/* <Route render={() => <FunctionChild num={this.state.num}/>}/> */}
        </Router>
      </div>
    )
  }
}

class ClassChild extends Component {
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    return (
      <div>ClassChild {this.props.num}</div>
    )
  }
}

function FunctionChild (props) {
  const {num} = props
  useEffect(() => {
    console.log('useEffect')
  }, [])
  return (
    <div>FunctionChild {num}</div>
  )
}