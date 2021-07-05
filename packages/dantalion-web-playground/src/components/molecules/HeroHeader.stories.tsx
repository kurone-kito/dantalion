import type { Meta, Story } from '@storybook/react';
import { HeroHeader, Props } from './HeroHeader';

export default Object.freeze<Meta>({
  argTypes: { onToggleMenu: { action: 'onToggleMenu' } },
  component: HeroHeader,
  title: `molecules/${HeroHeader.displayName}`,
});

const Template: Story<Props> = ({ expand, menuResource, onToggleMenu }) => (
  <HeroHeader
    expand={expand}
    menuResource={menuResource}
    onToggleMenu={onToggleMenu}
  />
);

export const Default = Template.bind({});
Default.args = { expand: false, menuResource: 'menuResource' };
