import type { ReactNode, VFC } from 'react';
import FooterNavigation from './FooterNavigation';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the author name. */
  readonly author?: ReactNode;
  /** The children items. */
  readonly children?: ReactNode;
}

/** The footer component */
const Component: VFC<Props> = ({ author, children }) => (
  <footer
    className="nm-flat-gray-300-xs mt-4 py-4 text-gray-700 text-sm"
    role="contentinfo"
  >
    <nav className="flex flex-col mx-auto sm:flex-row lg:container">
      <div className="flex flex-grow items-center justify-center">
        <FooterNavigation author={author} />
      </div>
      <div className="flex-shrink p-4">{children}</div>
    </nav>
  </footer>
);
Component.displayName = 'Footer';

export default Component;
