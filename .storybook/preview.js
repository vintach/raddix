import { SubTitle, Text, Title, TextCode } from './src';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
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
      code: TextCode
    }
  },
  viewMode: 'docs'
};
