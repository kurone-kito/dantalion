import type { Meta, Story } from '@storybook/react';
import Footer, { Props } from './Footer';

export default Object.freeze<Meta>({
  component: Footer,
  title: `molecules/${Footer.displayName}`,
});

const Template: Story<Props> = ({ author }) => <Footer author={author} />;

export const Default = Template.bind({});
Default.args = { author: 'Author' };
