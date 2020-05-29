import React, { Component } from 'react'
import ChildContextType from './ChildContextType';
import ChildUseContext from './ChildUseContext'
import {ChildConsumer, ChildConsumer2} from './ChildConsumer'
import './ComponentCommunication.css' // 后缀.css不可省略

// const Context = React.createContext() // 创建上下文
// // console.log(Context)
// const {Provider} = Context // 结构出提供者和消费者
import {ThemeProvider, UserProvider, ThemeConsumer} from './context' // Provider可以有多个

export default class ComponentCommunication extends Component {
  constructor (props) { 
    super(props) // constructor必须接受props，并调用super(props)，否则不存在this
    this.state = {
      themeColor: {
        themeColor: 'red'
      },
      user: {
        user: 'cc'
      }
    }
  }
  render() {
    return (
      <ThemeProvider value={this.state.themeColor}>
        ComponentCommunication page
        {/* Provider可以嵌套 */}
        <UserProvider value={this.state.user}>
          {/* 子组件一 */}
          <ChildContextType/>
          {/* 子组件二 */}
          <ChildUseContext/>
        </UserProvider>

        <ThemeConsumer>
          {
            // 接收一个ctx上下文作为参数，使用...ctx传递给子组件
            ctx => (
              // 子组件三：Consumer用法1
              <ChildConsumer {...ctx}/>
            )
          }
        </ThemeConsumer>

        {/* 子组件四：Consumer用法2 */}
        <ChildConsumer2/>
      </ThemeProvider>
    )
  }
}
