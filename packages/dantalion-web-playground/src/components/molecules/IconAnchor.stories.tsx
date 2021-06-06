import { faCat } from '@fortawesome/free-solid-svg-icons';
import { Meta, Story } from '@storybook/react';
import IconAnchor, { Props } from './IconAnchor';

export default Object.freeze<Meta>({
  component: IconAnchor,
  title: `molecules/${IconAnchor.displayName}`,
});

const Template: Story<Props> = ({
  children,
  href,
  icon,
  nofollow,
  sup,
  tooltip,
}) => (
  <IconAnchor
    href={href}
    icon={icon}
    nofollow={nofollow}
    sup={sup}
    tooltip={tooltip}
  >
    {children}
  </IconAnchor>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Dantalion',
  href: 'https://kurone-kito.github.io/dantalion',
  icon: faCat,
  nofollow: false,
  sup: false,
  tooltip: 'Tooltip',
};
