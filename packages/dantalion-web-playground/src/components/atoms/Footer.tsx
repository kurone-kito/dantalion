import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactNode, VFC } from 'react';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the author-name */
  readonly author?: ReactNode;
}

/** The footer component */
const Component: VFC<Props> = ({ author }) => (
  <footer className=" text-gray-600" role="contentinfo">
    <hr className="border-gray-300" />
    <p className="text-center py-4">
      <small>
        &copy; {author} &lt;
        <a
          className="text-blue-900 hover:text-blue-600"
          href="https://twitter.com/kurone_kito"
          hrefLang="ja"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
          @kurone_kito
        </a>
        &gt;&nbsp;|&nbsp;
        <a
          className="text-blue-900 hover:text-blue-600"
          href="https://github.com/kurone-kito/dantalion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </small>
    </p>
  </footer>
);
Component.displayName = 'Footer';

export default Component;
