import React, { Component } from 'react'
// import {Route, Link, withRouter, Prompt} from 'react-router-dom'
import {
  Route,
  Link,
  // useHistory,
  // useLocation,
  // useRouteMatch,
  // useParams
  withRouter,
  Prompt
} from '../../kReactRouterDom/index'

// ----------- 函数组件ProductPage ----------
// 路由跳转的页面接收一个对象作为参数：{history: {…}, location: {…}, match: {…}, staticContext: undefined}
// function ProductPage({match, location}) {
//   // console.log(match) // {path: "/product/:id", url: "/product/2", isExact: false, params: {…}}
//   // console.log(location) // {pathname: "/product/2/detail/2", search: "", hash: "", state: undefined, key: "eandz3"}
//   const {id} = match.params
//   return (
//     <div>
//       <p>ProductPage：{id}</p>
//       {/* 嵌套路由*/}
//       <Link to={match.url + '/detail/' + id}>detail</Link>
//       <Route path={match.url + '/detail/:id'} component={Detail}></Route>
//     </div>
//   )
// }

// @withRouter
// class ProductPage extends Component {
//   render() {
//     const {id} = this.props.match.params
//     return (
//       <div>
//         <p>ProductPage：{id}</p>
//         {/* 嵌套路由*/}
//         <Link to={this.props.match.url + '/detail/' + id}>detail</Link>
//         <Route path={this.props.match.url + '/detail/:id'} component={Detail}></Route>
//       </div>
//     )
//   }
// }


@withRouter
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {confirm: true};
  }
  render() {
    // console.log("Product", this.props)
    return (
      <div>
        <h3>Product</h3>
        <Link to="/">go home</Link>
        <Route path={this.props.match.url + '/detail/:id'} component={Detail}></Route>
        <Prompt
          when={this.state.confirm}
          // message="Are you sure you want to leave?"
          message={location => {
            return "Are you sure you want to leave-fun";
          }}
        />
      </div>
    );
  }
}


function Detail ({match, location}) {
  // console.log(
  //   useHistory(),
  //   useLocation(),
  //   useRouteMatch(),
  //   useParams()
  // )

  // console.log(match) // 和父路由的match不同：{path: "/product/2/detail/:id", url: "/product/2/detail/2", isExact: true, params: {…}}
  // console.log(location) // 和父路由的location完全一样：{pathname: "/product/2/detail/2", search: "", hash: "", state: undefined, key: "eandz3"}
  return (
    <div>
      detail：{match.params.id}
    </div>
  )
}

export default ProductPage