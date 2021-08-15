import type { Meta, Story } from '@storybook/react';
import type { Options } from 'react-markdown';
import { InlineMarkdown } from './InlineMarkdown';

export default Object.freeze<Meta>({
  component: InlineMarkdown,
  title: `atoms/${InlineMarkdown.displayName}`,
});

const Template: Story<Options> = ({ children }) => (
  <InlineMarkdown>{children}</InlineMarkdown>
);

export const Default = Template.bind({});
Default.args = { children: '_Markdown_ **contents**' };
