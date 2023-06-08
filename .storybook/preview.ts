import type { Preview } from '@storybook/react';
import { SubTitle, Text, Title, TextCode, TextPre } from './src';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      components: {
        h1: Title,
        h2: SubTitle,
        p: Text,
        code: TextCode,
        pre: TextPre
      }
    }
  }
};
