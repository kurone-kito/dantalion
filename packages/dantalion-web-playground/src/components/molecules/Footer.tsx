import {
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import type { ReactNode, VFC } from 'react';
import List from '../atoms/List';
import IconAnchor from './IconAnchor';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the author-name */
  readonly author?: ReactNode;
}

/** The footer component */
const Component: VFC<Props> = ({ author }) => (
  <footer className="text-gray-600" role="contentinfo">
    <hr className="border-gray-300" />
    <small className="text-sm">
      <List
        className="divide-x-2 divide-gray-400 flex flex-row justify-center p-4"
        itemType={({ className, ...props }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li className={classNames('px-1', className)} {...props} />
        )}
      >
        <>
          &copy; {author} &lt;
          <IconAnchor
            href="https://twitter.com/kurone_kito"
            icon={faTwitter}
            tooltip="Twitter"
          >
            @kurone_kito
          </IconAnchor>
          &gt;
        </>
        <IconAnchor
          href="https://kit.black/"
          icon={faHome}
          tooltip="Homepage"
        />
        <IconAnchor
          href="https://github.com/kurone-kito"
          icon={faGithub}
          tooltip="GitHub"
        />
        <IconAnchor
          href="https://www.youtube.com/channel/UCJs_ejHQM0rcemJaeO2s5vA"
          icon={faYoutube}
          tooltip="YouTube"
        />
      </List>
    </small>
  </footer>
);
Component.displayName = 'Footer';

export default Component;
