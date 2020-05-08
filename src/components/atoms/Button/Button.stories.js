import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { storiesOf } from '@storybook/react';

storiesOf('Atoms/Button').add('Normal', () => <Button>Click</Button>);
