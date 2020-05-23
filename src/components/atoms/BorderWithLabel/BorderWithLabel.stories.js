import React from 'react';
import BorderWithLabel from './BorderWithLabel';
import { storiesOf } from '@storybook/react';

storiesOf('Atoms/BorderWithLabel', module).add('Normal', () => (
  <BorderWithLabel label="label">Test</BorderWithLabel>
));
