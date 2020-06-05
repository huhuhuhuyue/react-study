import React, { Component } from 'react'
import context from './context'
import matchPath from './matchPath'

export default class Switch extends Component {
  render() {
    return (
      <context.Consumer>
      {context => {
        const {location} = context;
        //children object | array
        let match, element;
        // match 记录是否找到匹配的元素
        //如果找到匹配的元素 记录在element
        // React.Children获取所有子元素
        React.Children.forEach(this.props.children, child => {
          // React.isValidElement用来判断当前的child是一个有效的元素
          if (match == null && React.isValidElement(child)) {
            element = child;
            const {path} = child.props;
            match = path
              ? matchPath(location.pathname, child.props)
              : context.match;
          }
        });
        // React.cloneElement克隆元素
        return match ? React.cloneElement(element) : null;
      }}
      </context.Consumer>
    )
  }
}
