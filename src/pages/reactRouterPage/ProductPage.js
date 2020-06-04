import React from 'react'
import {Route, Link } from 'react-router-dom'
// 路由跳转的页面接收一个对象作为参数：{history: {…}, location: {…}, match: {…}, staticContext: undefined}
export default function ProductPage({match}) {
  // console.log(match) // {isExact: true,  params: {id: ":123"},  path: "/product/:id",  url: "/product/:123"}
  const {id} = match.params
  return (
    <div>
      <p>ProductPage：{id}</p>
      {/* 嵌套路由*/}
      <Link to={match.url + '/product/' + id}>product</Link>
      <Route path={match.url + '/product/:id'} component={Product}></Route>
    </div>
  )
}


function Product ({match}) {
  return (
    <div>
      Product：{match.params.id}
    </div>
  )
}