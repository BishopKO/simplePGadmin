import React from 'react';
import { storiesOf } from '@storybook/react';
import InputWithBorder from './InputWithBorder';

storiesOf('Molecules/InputWithBorder', module).add('Normal', () => (
  <InputWithBorder label="Test label" />
));
