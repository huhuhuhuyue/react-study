import React, { Component } from 'react'
import {ThemeConsumer, UserConsumer} from './context'

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
              <UserConsumer>
                {
                  user => (
                    <p>ChildConsumer page2 {user.user}</p>
                  )
                }
              </UserConsumer>
            </div>
          )
        }
      </ThemeConsumer>
    )
  }
}
