import React from 'react';
import store from 'store';
import MainTemplate from 'components/templates/MainTemplate';
import StatusView from './Status';
import DatabasesView from './Databases';
import TablesView from './Tables';
import UsersView from './Users';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

const Root = () => (
  <Provider store={store}>
    <MainTemplate>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StatusView} />
          <Route path="/databases" component={DatabasesView} />
          <Route path="/tables" component={TablesView} />
          <Route path="/users" component={UsersView} />
          <Route path="/status" component={StatusView} />
        </Switch>
      </BrowserRouter>
    </MainTemplate>
  </Provider>
);

export default Root;
