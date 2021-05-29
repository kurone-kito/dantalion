import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactNode, VFC } from 'react';
import Anchor from '../atoms/Anchor';

/** Type definition of the required attributes. */
export interface Props {
  /** The children items. */
  readonly children?: ReactNode;
  /** The URL. */
  readonly href: string;
  /** The icon. */
  readonly icon: IconProp;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/** The footer component */
const Component: VFC<Props> = ({ children, href, icon, tooltip }) => (
  <Anchor href={href} tooltip={tooltip}>
    <FontAwesomeIcon icon={icon} />
    {children && <span className="ml-1">{children}</span>}
  </Anchor>
);
Component.displayName = 'IconAnchor';

export default Component;
