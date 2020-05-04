import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'components/templates/MainTemplate';
import UserTemplate from 'components/templates/UserTamplate';

const Root = () => (
  <MainTemplate>
    <Provider store={store}>
      <UserTemplate />
    </Provider>
  </MainTemplate>
);

export default Root;
