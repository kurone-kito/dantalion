import type { VFC } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';

/** The inline markdown component */
// eslint-disable-next-line import/prefer-default-export
export const InlineMarkdown: VFC<Options> = ({
  children,
  components,
  ...props
}) => (
  <ReactMarkdown
    className="markdown text-gray-700 dark:text-gray-200"
    components={{ p: ({ children: c }) => <>{c}</>, ...components }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </ReactMarkdown>
);
InlineMarkdown.displayName = 'InlineMarkdown';
