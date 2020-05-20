import React from 'react';
import StoryRouter from 'storybook-react-router';
import { storiesOf } from '@storybook/react';

import TableCreate from './TableCreate';

const grants = { grants: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'] };

storiesOf('Molecules/TableCreate', module)
  .addDecorator(StoryRouter)
  .add('Normal', () => <TableCreate show context={grants} />);
