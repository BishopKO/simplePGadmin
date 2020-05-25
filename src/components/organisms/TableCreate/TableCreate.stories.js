import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import TableCreate from './TableCreate';

storiesOf('Molecules/TableCreate', module).add('Normal', () => (
  <MemoryRouter>
    <TableCreate />
  </MemoryRouter>
));
