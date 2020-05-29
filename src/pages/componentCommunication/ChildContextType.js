import React, { Component } from 'react'
// const Context = React.createContext({themColor: 'pink'}) // 引入上下文
import {ThemeContext} from './context' // 要从外部引入，确保子组件和父组件使用的是同一个Context
 
export default class ContextType extends Component {
  static contextType = ThemeContext // 定义contextType  useContext可以有多个，contextType不能有多个
  // static contextType = UserContext // 后面的会覆盖前面的，导致获取不到themeColor
  render() {
    // console.log(this.context) // 从this.context中获取上级传来的参数，this.context是固定写法
    return (
      <div className={this.context.themeColor}>
        ContextType page
        {/* <p>{this.context.user}</p> */}
      </div>
    )
  }
}
