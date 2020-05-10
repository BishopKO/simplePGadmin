import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('Molecules/Input', module).add('Normal', () => <Input label="Test label" />);
