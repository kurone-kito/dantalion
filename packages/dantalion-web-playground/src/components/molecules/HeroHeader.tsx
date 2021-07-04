import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MouseEventHandler, ReactNode, VFC } from 'react';
import Logo from '../atoms/Logo';

/** Type definition of the required attributes. */
export interface Props {
  readonly expand?: boolean;
  readonly menuResource?: ReactNode;
  readonly onToggleMenu?: MouseEventHandler<HTMLButtonElement>;
}

const HeroHeader: VFC<Props> = ({ menuResource, onToggleMenu }) => (
  <header className="bg-gray-200 overflow-hidden text-gray-700 dark:bg-gray-700 dark:text-gray-200">
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className="flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className="flex items-center md:inset-y-0 md:left-0">
            <h1 className="flex items-center justify-between w-full md:w-auto">
              <Logo />
            </h1>
          </div>
          <div className="mr-2 flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center p-3 rounded-md sm:p-5"
              onClick={onToggleMenu}
              type="button"
            >
              <span className="sr-only">{menuResource}</span>
              <FontAwesomeIcon className="text-xl sm:text-2xl" icon={faBars} />
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
);
HeroHeader.displayName = 'HeroHeader';

export default HeroHeader;
