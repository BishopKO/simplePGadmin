import React from 'react';
import TableSearchUpdate from './TableSearchUpdate';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

storiesOf('Organisms/TableSearchUpdate', module).add('Normal', () => (
  <MemoryRouter>
    <TableSearchUpdate />
  </MemoryRouter>
));
