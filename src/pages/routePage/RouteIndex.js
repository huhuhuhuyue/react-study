import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import UserPage from './UserPage'
import PrivateRoute from './PrivateRoute'
import LoginPage from './LoginPage'
import NotFindPage from '../reactRouterPage/NotFindPage'
import BottomNav from '../../components/BottomNav/index'
const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/user",
    auth: PrivateRoute,
    component: UserPage
  },
  {
    component: NotFindPage
  }
]

export default class RouteIndex extends Component {
  render() {
    return (
      <div>
        <p>Route page</p>
        <Router>
          {/*<Link to='/'> 首页 </Link>
          <Link to='/user'> 用户 </Link>
          <Link to='/login'> 登录 </Link>*/}
          <BottomNav/>

          <Switch>
            {/*<Route exact path='/' component={HomePage}></Route>
            {/*<Route path='/user' component={UserPage}></Route> */}
            {/*<PrivateRoute path='/user' component={UserPage}></PrivateRoute>
            <Route path='/login' component={LoginPage}></Route>
            <Route component={NotFindPage}></Route>*/}

            {routes.map((RouteItem, index) => {
              // console.log(RouteItem) // {path: "/", exact: true, component: ƒ}
              return RouteItem.auth ? <RouteItem.auth key={index} {...RouteItem}/> : <Route key={index} {...RouteItem}/>
            })}
          </Switch>
        </Router>
      </div>
    )
  }
}
