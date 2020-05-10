import React from 'react';
import store from 'store';
import { Provider } from 'react-redux';
import MainTemplate from 'templates/MainTemplate';
import UserTemplate from 'templates/UserTamplate';
import MainWindowTemplate from 'templates/MainWindowTemplate';

const Root = () => {
  return (
    <Provider store={store}>
      <MainTemplate>
        <UserTemplate>
          <MainWindowTemplate />
        </UserTemplate>
      </MainTemplate>
    </Provider>
  );
};

export default Root;
