import type { ReactNode, VFC } from 'react';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the main content */
  readonly children?: ReactNode;
}

/** The frame of the results */
const Component: VFC<Props> = ({ children }) => (
  <section className="mb-6 nm-inset-gray-200-xs p-4 rounded-xl md:px-6 md:rounded-3xl">
    {children}
  </section>
);
Component.displayName = 'ResultFrame';

export default Component;