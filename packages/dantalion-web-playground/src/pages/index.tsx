import { FormEventHandler, useCallback, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Anchor from '../components/atoms/Anchor';
import Header from '../components/atoms/Header';
import Article from '../components/molecules/Article';
import BirthForm from '../components/molecules/BirthForm';
import Footer from '../components/molecules/Footer';

/** The index page component */
const Component: VFC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header>{t('web.description')}</Header>
      <main className="md:container mx-auto text-gray-600">
        <BirthForm
          birthday="2000-01-01"
          birthdayLabel={t('web.form.birthday')}
          buttonLabel={t('web.form.submit')}
          legendLabel={t('web.form.legend')}
          nicknameLabel={t('web.form.nickname')}
          notes={t('web.form.notes', { returnObjects: true })}
          onSubmit={useCallback<FormEventHandler<HTMLFormElement>>((e) => {
            // eslint-disable-next-line no-console
            console.debug('submit');
            e.preventDefault();
          }, [])}
        />
        <Article
          featureBody={t('web.feature.body', { returnObjects: true })}
          featureHeading={t('web.feature.title')}
          tooltipFeatureDetails={t('web.tooltip.summary')}
        >
          {t('web.preface', { joinArrays: '\n\n' })}
        </Article>
        <ReactMarkdown className="mx-0 my-5 nm-inset-gray-500-sm overflow-auto p-6 text-white md:rounded-3xl">
          {t('web.install', { joinArrays: '\n' })}
        </ReactMarkdown>
        <p className="font-bold text-center text-xl py-6">
          <Anchor href="https://github.com/kurone-kito/dantalion">
            {t('web.seeRepo')}
          </Anchor>
        </p>
      </main>
      <Footer author={t('web.author')} />
    </>
  );
};
Component.displayName = 'Index';

export default Component;
