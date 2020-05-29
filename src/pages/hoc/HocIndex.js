import React from 'react'


// 高阶组件写法
function HocParent (Comp) {
  return (props) => (
    <div>
      <Comp {...props}/>
    </div>
  )
}

function Child (props) {
  return <div> 哈哈 {props.name}</div>
}

export const HocIndex = HocParent(Child)


// 什么是高阶组件？
// 高阶组件是一个函数，他接受一个组件作为参数，返回一个新的组件
