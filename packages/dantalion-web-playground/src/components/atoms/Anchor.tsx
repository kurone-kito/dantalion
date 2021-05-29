import classNames, { Argument } from 'classnames';
import type { VFC } from 'react';
import { ReactNode } from 'react-markdown';

/** Type definition of the required attributes. */
export interface Props {
  /** The children items. */
  readonly children: ReactNode;
  /** If you need the CSS classes, specify them. */
  readonly className?: Argument;
  /** The URL. */
  readonly href: string;
  /** Whether the component remove a target attribute. */
  readonly noblank?: boolean;
  /** Whether the component specifies a “nofflow” flag. */
  readonly nofollow?: boolean;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/** The anchor component */
const Component: VFC<Props> = ({
  children,
  className,
  href,
  noblank,
  nofollow,
  tooltip,
}) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a
    className={classNames('text-blue-900 hover:text-blue-600', className)}
    href={href}
    rel={classNames('noopener noreferrer', { nofollow })}
    title={tooltip}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...(noblank ? {} : { target: '_blank' })}
  >
    {children}
  </a>
);
Component.displayName = 'Anchor';

export default Component;
