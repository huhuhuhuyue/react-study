import React from 'react'
import {Route, Link } from 'react-router-dom'

// 路由跳转的页面接收一个对象作为参数：{history: {…}, location: {…}, match: {…}, staticContext: undefined}
export default function ProductPage({match, location}) {
  console.log(match) // {path: "/product/:id", url: "/product/2", isExact: false, params: {…}}
  // console.log(location) // {pathname: "/product/2/detail/2", search: "", hash: "", state: undefined, key: "eandz3"}
  const {id} = match.params
  return (
    <div>
      <p>ProductPage：{id}</p>
      {/* 嵌套路由*/}
      <Link to={match.url + '/detail/' + id}>detail</Link>
      <Route path={match.url + '/detail/:id'} component={Detail}></Route>
    </div>
  )
}


function Detail ({match, location}) {
  console.log(match) // 和父路由的match不同：{path: "/product/2/detail/:id", url: "/product/2/detail/2", isExact: true, params: {…}}
  // console.log(location) // 和父路由的location完全一样：{pathname: "/product/2/detail/2", search: "", hash: "", state: undefined, key: "eandz3"}
  return (
    <div>
      detail：{match.params.id}
    </div>
  )
}