import React from 'react';
import { ThemeProvider } from 'styled-components';
import mainTheme from 'themes/mainTheme';

const themeDecorator = (storyFn) => <ThemeProvider theme={mainTheme}>{storyFn()}</ThemeProvider>;

export default themeDecorator;
