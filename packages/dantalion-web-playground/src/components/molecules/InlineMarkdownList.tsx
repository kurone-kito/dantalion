import type { VFC } from 'react';
import InlineMarkdown from '../atoms/InlineMarkdown';
import List, { Props as ListProps } from '../atoms/List';

/** Type definition of the required attributes. */
export interface Props extends Omit<ListProps, 'children'> {
  /** The children items. */
  readonly children?: readonly string[];
}

/** The generic list component which its items allow the Markdown format. */
const Component: VFC<Props> = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List {...props}>
    {children?.map((child) => (
      <InlineMarkdown key={child}>{child}</InlineMarkdown>
    ))}
  </List>
);
Component.displayName = 'InlineMarkdownList';

export default Component;
