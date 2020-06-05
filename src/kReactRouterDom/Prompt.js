import React, {Component} from "react"
import context from "./context"

export default function Prompt ({message, when = true }) {
  return (
    <context.Consumer>
      {context => {
        if (!when || context.staticContext) return null
        const method = context.history.block
        return (
          <LiceCycle
          onMount={self => {
            self.release = method(message)
          }}
          onUnmount={self => {
            self.release()
          }}
          />
        )
      }}
    </context.Consumer>
  )
}


class LiceCycle extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount.call(this, this)
  }
  componentWillUnmount () {
    this.props.onUnmount && this.props.onUnmount.call(this, this)
  }
  render() {
    return null
  }
}
