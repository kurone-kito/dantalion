import type { Meta, Story } from '@storybook/react';
import { InlineMarkdownList, Props } from './InlineMarkdownList';

export default Object.freeze<Meta>({
  component: InlineMarkdownList,
  title: `molecules/${InlineMarkdownList.displayName}`,
});

const Template: Story<Props> = ({ children, className, itemType, order }) => (
  <InlineMarkdownList className={className} itemType={itemType} order={order}>
    {children}
  </InlineMarkdownList>
);

export const Default = Template.bind({});
Default.args = {
  children: ['**Foo**', '_Bar_', 'Qux'],
  className: 'list-disc text-red-900 dark:text-red-200',
  order: false,
};
