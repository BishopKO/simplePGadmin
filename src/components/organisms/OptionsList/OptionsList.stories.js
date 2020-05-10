import React from 'react';
import { storiesOf } from '@storybook/react';
import OptionsList from './OptionsList';

const dbsList = Array(30)
  .fill('Database')
  .map((item, index) => `${item}_${index}`);

const optionsDbs = [
  { value: 'dbCreate', name: 'Create database' },
  { value: 'dbGrants', name: 'Show grants' },
  { value: 'dbDrop', name: 'Drop database' },
];

storiesOf('Organisms/OptionsList', module).add('Normal', () => (
  <OptionsList title={'Title:'} options={optionsDbs} list={dbsList} />
));
