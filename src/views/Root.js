import React from 'react';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import UserTemplate from 'templates/UserTamplate';
import MainWindowTemplate from 'templates/MainWindowTemplate';

import DatabaseCreate from 'components/Databases/DatabaseCreate/DatabaseCreate';
import DatabaseRename from 'components/Databases/DatabaseRename/DatabaseRename';
import DatabaseDrop from 'components/Databases/DatabaseDrop/DatabaseDrop';

import TableCreate from 'components/Tables/TableCreate/TableCreate';
import TableInsert from 'components/Tables/TableInsert/TableInsert';
import TableDrop from 'components/Tables/TableDrop/TableDrop';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <Provider store={store}>
      <MainTemplate>
        <UserTemplate>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainWindowTemplate} />
              <Route path={'/dbCreate'} render={(props) => <DatabaseCreate {...props} show />} />
              <Route path={'/dbRename/:name'} render={(props) => <DatabaseRename {...props} />} />
              <Route path={'/dbDrop/:name'} render={(props) => <DatabaseDrop {...props} />} />
              <Route path={'/tblCreate'} render={(props) => <TableCreate {...props} />} />
              <Route path={'/tblInsert/:name'} render={(props) => <TableInsert {...props} />} />
              <Route path={'/tblDrop/:name'} render={(props) => <TableDrop {...props} />} />
            </Switch>
          </BrowserRouter>
        </UserTemplate>
      </MainTemplate>
    </Provider>
  );
};

export default Root;
