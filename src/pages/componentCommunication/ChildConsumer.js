import React, { Component } from 'react'
import {ThemeConsumer} from './context'

// Consumer用法1
export class ChildConsumer extends Component {
  render() {
    return (
      <div className={this.props.themeColor}>
        ChildConsumer page1
      </div>
    )
  }
}

// Consumer用法2
export class ChildConsumer2 extends Component {
  render() {
    return (
      <ThemeConsumer>
        {
          ctx => (
            <div className={ctx.themeColor}>
              ChildConsumer page2
            </div>
          )
        }
      </ThemeConsumer>
    )
  }
}
