import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import type { ReactNode, VFC } from 'react';
import IconAnchor from './IconAnchor';

/** Type definition of the required attributes. */
export interface Props {
  /** The children items. */
  readonly children?: ReactNode;
  /** The URL. */
  readonly href: string;
  /** Whether the component specifies a “nofflow” flag. */
  readonly nofollow?: boolean;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/** The external anchor component */
const Component: VFC<Props> = ({ children, href, nofollow, tooltip }) => (
  <IconAnchor
    href={href}
    icon={faExternalLinkAlt}
    nofollow={nofollow}
    sup
    tooltip={tooltip}
  >
    {children}
  </IconAnchor>
);
Component.displayName = 'ExternalAnchor';

export default Component;
