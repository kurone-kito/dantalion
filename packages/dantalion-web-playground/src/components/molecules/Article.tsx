import type {
  AnchorHTMLAttributes,
  ReactNode,
  ReactNodeArray,
  VFC,
} from 'react';
import ReactMarkdown from 'react-markdown';
import List from '../atoms/List';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the main article text as a Markdown format */
  readonly children: string;
  /** Specifies the body of feature text */
  readonly featureBody?: ReactNodeArray;
  /** Specifies the heading of feature text */
  readonly featureHeading?: ReactNode;
}

/** The anchor component for main articles */
const Anchor: VFC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    className="text-blue-900 hover:text-blue-600"
    rel="nofollow noopener noreferrer"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

/** The main article component */
const Component: VFC<Props> = ({ children, featureBody, featureHeading }) => (
  <article>
    <ReactMarkdown
      components={{
        // eslint-disable-next-line react/jsx-props-no-spreading
        a: ({ node, ...props }) => <Anchor {...props} />,
        // eslint-disable-next-line react/jsx-props-no-spreading
        p: ({ node, ...props }) => <p className="py-3" {...props} />,
      }}
      className="font-light leading-loose py-3 px-3 sm:px-2 text-lg"
      linkTarget="_blank"
    >
      {children}
    </ReactMarkdown>
    <h2 className="font-bold text-2xl">{featureHeading}</h2>
    <List className="leading-relaxed list-inside list-disc p-4">
      {featureBody}
    </List>
  </article>
);
Component.displayName = 'Article';

export default Component;
