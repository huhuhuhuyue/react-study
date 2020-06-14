import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ExpamplePage from './routes/ExpamplePage'
// import UserPage from './routes/UserPage'
import {UserPageDynamic} from './dynamic/index'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path='/example' component={ExpamplePage} />
        {/*<Route path='/user' component={UserPage} />*/}
        <Route path='/user' component={UserPageDynamic} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
