import React, { Component } from 'react'


// 高阶组件写法
function Parent (Comp) {
  return (props) => (
    <div>
      <Comp {...props}/>
    </div>
  )
}

// 装饰器写法
@Parent
class DecoratorIndex extends Component {
  render() {
    return (
      <div> 哈哈 {this.props.name}</div>
    )
  }
}
export default DecoratorIndex

// 装饰器只能装饰class组件
// 安装依赖：npm install react-app-rewired@2.0.2-next.0 babel-plugin-import --save
// 安装依赖：npm install --save-dev babel-plugin-transform-decorators-legacy
// 根目录下新建文件config-overrides.js
// 将package.json中scripts的react-scripts全部修改为react-app-rewired
 