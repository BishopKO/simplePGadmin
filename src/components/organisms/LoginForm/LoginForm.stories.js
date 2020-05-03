import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginForm from './LoginForm';

storiesOf('Organisms/Login', module).add('Normal', () => <LoginForm />);
