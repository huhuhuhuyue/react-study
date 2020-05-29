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
  changeTheme = () => {
    let color = this.state.themeColor.themeColor === 'red' ? 'blue' : 'red';
    this.setState({
      themeColor: {
        themeColor: color
      }
    })
  }
  render() {
    return (
      // context发生变化子组件会重新渲染，变化是浅比较
      // 如果传递值的方式是value={{themeColor: color}}，由于每次传入的对象的指针不同，每次都会进行刷新
      // value={this.state.themeColor}每次传入的是同一个对象
      <ThemeProvider value={this.state.themeColor}>
        ComponentCommunication page
        <button onClick={this.changeTheme}>换肤</button>
        {/* Provider可以嵌套 */}
        <UserProvider value={this.state.user}>
          {/* 子组件一 */}
          <ChildContextType/>
          {/* 子组件二 */}
          <ChildUseContext/>
          {/* 子组件四：Consumer用法2 && Consumer嵌套 */}
          <ChildConsumer2/>
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
      </ThemeProvider>
    )
  }
}

/**
 * 区别：
 *  consumer：适用于函数组件和类组件。
 *    用法：{ ctx => (<Comp {...ctx} />) }
 *  contextType：只能用于类组件，而且一个组件只能有一个contextType，如果有多个，后面的会覆盖前面的。
 *    用法：static contextType = ThemeContext
 *  useContext：只能用于函数组件，一个组件可以有多个useContext。
 *    用法：const ThemeContextData = useContext(ThemeContext)
 */