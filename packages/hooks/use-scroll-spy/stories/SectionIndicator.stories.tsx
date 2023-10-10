import type { Meta, StoryObj } from '@storybook/react';

import { SectionIndicator } from '../examples/section-indicator';

const meta: Meta<typeof SectionIndicator> = {
  component: SectionIndicator,
  title: 'useScrollSpy'
};

export default meta;
type Story = StoryObj<typeof SectionIndicator>;

export const Indicator: Story = {
  args: {},
  name: 'Section Indicator'
};
