import React from 'react'
import context from './context'

const withRouter = (Comp) => {
  return (props) => {
    // console.log(props)
    return (
      <context.Consumer>
        { (context) => <Comp {...context} {...props}/> }
      </context.Consumer>
    )
  }
}
export default withRouter