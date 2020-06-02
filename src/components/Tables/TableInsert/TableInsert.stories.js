import React from 'react';
import { storiesOf } from '@storybook/react';
import TableInsert from './TableInsert';

import { Provider } from 'react-redux';
import store from '../../../store';

storiesOf('Tables/Table INSERT', module).add('Normal', () => (
  <Provider store={store}>
    <TableInsert />
  </Provider>
));
