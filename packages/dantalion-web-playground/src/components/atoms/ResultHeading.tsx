import type { ReactNode, VFC } from 'react';
import InlineMarkdown from './InlineMarkdown';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the additional information. */
  readonly additional?: ReactNode;
  /** The children items. */
  readonly children?: ReactNode;
  /** Specifies the detail. */
  readonly detail?: string;
  /** Specifies the heading. */
  readonly heading?: ReactNode;
}

/** The heading for result */
const Component: VFC<Props> = ({
  additional,
  children,
  detail = '',
  heading,
}) => (
  <header className="leading-loose mb-4">
    <h2 className="border-r-2 border-gray-300 inline mr-2 pr-2 text-gray-900">
      {heading}
    </h2>
    <p className="inline">
      <InlineMarkdown>{detail}</InlineMarkdown>
    </p>
    <hr className="border-gray-300 mb-6 mt-3" />
    <div className="p-0 text-2xl text-center sm:text-3xl">
      <h3 className="font-extrabold p-0">{children}</h3>
      {!!additional && <p className="font-extralight p-0">{additional}</p>}
    </div>
  </header>
);
Component.displayName = 'ResultHeading';

export default Component;
