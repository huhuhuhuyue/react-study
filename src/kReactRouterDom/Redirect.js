import React, {Component} from "react";
import context from "./context";

export default class Redirect extends Component {
  render() {
    return (
      <context.Consumer>
        {context => {
          const {history} = context;
          const {to, push = false} = this.props;
          return (
            // 要在当前组件挂载后才能跳转
            <LiceCycle
              onMount={() => {
                // 兼容了to是字符串，在源码中要处理to是字符串和对象两个情况
                // to有字符串和对象的情况
                push ? history.push(to) : history.replace(to);
              }}
            />
          );
        }}
      </context.Consumer>
    );
  }
}

class LiceCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }
  render() {
    return null;
  }
}
