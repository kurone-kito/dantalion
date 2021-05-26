import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Footer from '../components/atoms/Footer';
import Header from '../components/atoms/Header';
import Article from '../components/molecules/Article';

const Component: VFC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header>{t('web.description')}</Header>
      <main className="max-w-screen-lg mx-auto text-gray-600">
        <Article
          featureBody={t('web.feature.body', { returnObjects: true })}
          featureHeading={t('web.feature.title')}
        >
          {t('web.preface', { joinArrays: '\n\n' })}
        </Article>
        <ReactMarkdown className="nm-inset-gray-500-sm mx-0 my-5 overflow-auto p-6 md:rounded-3xl text-white">
          {t('web.install', { joinArrays: '\n' })}
        </ReactMarkdown>
      </main>
      <Footer author={t('web.author')} />
    </>
  );
};
Component.displayName = 'Index';

export default Component;
