import type { ReactNode, VFC } from 'react';

/** Type definition of the required attributes. */
export interface Props {
  /** The children items. */
  readonly children?: ReactNode;
}

/** The header component */
const Component: VFC<Props> = ({ children }) => (
  <header className="text-gray-700">
    <h1
      className="font-thin py-10 text-4xl text-center sm:text-6xl"
      role="banner"
    >
      <i aria-label="Lion" className="not-italic" role="img">
        🦁
      </i>
      Dantalion:
      <wbr />
      &nbsp;
      {children}
    </h1>
  </header>
);
Component.displayName = 'Header';

export default Component;
