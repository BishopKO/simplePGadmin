import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import LoginForm from './LoginForm';

storiesOf('Organisms/Login', module)
  .addDecorator(StoryRouter)
  .add('Normal', () => <LoginForm />);
