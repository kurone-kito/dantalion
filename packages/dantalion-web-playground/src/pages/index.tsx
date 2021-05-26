import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Component: VFC = () => {
  const { t } = useTranslation();
  const preface = t<string, string[]>('web.preface', { returnObjects: true });
  return (
    <>
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
          {t('web.description')}
        </h1>
      </header>
      <main className="max-w-screen-lg mx-auto text-gray-600">
        <p className="font-extralight text-3xl text-center">
          {t('web.comingSoon')}
        </p>
        {preface.map((text) => (
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  className="text-blue-900 hover:text-blue-600"
                  rel="noopener noreferrer"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}
                />
              ),
            }}
            className="font-light py-3 px-3 sm:px-2 text-lg"
            key={text}
            linkTarget="_blank"
          >
            {text}
          </ReactMarkdown>
        ))}
        <ReactMarkdown className="nm-inset-gray-500-sm mx-0 my-5 overflow-auto p-6 md:rounded-3xl text-white">
          {t('web.install', { joinArrays: '\n' })}
        </ReactMarkdown>
      </main>
      <footer className=" text-gray-600" role="contentinfo">
        <hr className="border-gray-300" />
        <p className="text-center py-4">
          <small>
            &copy; {t('web.author')} &lt;
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
    </>
  );
};
Component.displayName = 'Index';

export default Component;
