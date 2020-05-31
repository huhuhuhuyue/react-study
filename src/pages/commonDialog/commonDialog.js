import React, { Component } from 'react'
import {createPortal} from 'react-dom' // react-dom为我们提供了createPortal方法
// createPortal方法接收两个参数，第一个参数是需要挂载的组件，而第二个参数则是要挂载到的DOM节点。

export default class commonDialog extends Component {
  // 不知道为什么会执行2次，所以写到了componentWillMount
  // 问题已解决，解决方案：react-study\src\index.js中去掉<React.StrictMode>就可以了，原因：严格模式不能自动检测到你的副作用，但它可以帮助你发现它们，使它们更具确定性。通过故意重复调用以下函数来实现的该操作
  // 参考文档：https://reactjs.bootcss.com/docs/strict-mode.html、http://www.zyiz.net/tech/detail-116426.html
  constructor(props) {
    super(props)
    const doc = window.document
    this.el = doc.createElement('div')
    doc.body.appendChild(this.el)
  }

  // componentWillMount () {
  //   this.el = document.createElement('div')
  //   document.body.appendChild(this.el)
  // }

  // // 要在组件卸载前删除el，不然el会一直留在body中，反复显示隐藏会有多个空div留在body中
  // // 因为点击buttom，showDialog变为false只卸载createPortal的参数1
  componentWillUnmount () {
    this.el && document.body.removeChild(this.el)
  }
  render() {
    return createPortal(
      <div className='dialog'>
        {this.props.msg || 'dialog'}
      </div>,
      this.el
    )
  }
}
