import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import TableCreate from './TableCreate';

storiesOf('Organisms/TableCreate', module).add('Normal', () => (
  <MemoryRouter>
    <TableCreate />
  </MemoryRouter>
));
