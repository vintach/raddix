import { create } from '@storybook/theming';
import { addons } from '@storybook/addons';

const theme = create({
  base: 'light',
  brandTitle: 'Mark',
  barSelectedColor: '#3633ee',
  background: {
    hoverable: 'rgba(54, 51, 238, 0.1)'
  },
  hoverable: 'rgba(54, 51, 238, 0.1)'
});

addons.setConfig({
  theme
});
