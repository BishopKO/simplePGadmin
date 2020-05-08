import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './Select';

const sample = new Array(10).fill(0).map((item, index) => 'Database_' + index.toString());

storiesOf('Molecules/Select', module).add('Normal', () => <Select databases={sample} />);
