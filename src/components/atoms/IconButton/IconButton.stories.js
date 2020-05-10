import React from 'react';
import { storiesOf } from '@storybook/react';
import IconButton from './IconButton';
import crossIcon from 'assets/crossIcon.svg';

storiesOf('Atoms/IconButton').add('Normal', () => <IconButton icon={crossIcon} />);
