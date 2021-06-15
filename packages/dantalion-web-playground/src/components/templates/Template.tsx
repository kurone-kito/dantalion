import { createAccessors } from '@kurone-kito/dantalion-i18n';
import { useTranslation } from 'react-i18next';
import { useMemo, VFC } from 'react';
import ReactMarkdown from 'react-markdown';
import Anchor from '../atoms/Anchor';
import Header from '../atoms/Header';
import Article from '../molecules/Article';
import Footer from '../molecules/Footer';
import BirthForm from '../organisms/BirthForm';
import Head from '../organisms/Head';
import Result from '../organisms/Result';
import { usePSDecoder } from '../../hooks/usePersonality';
import FormReducer from '../../stores/FormReducer';

const Component: VFC = () => {
  const { t } = useTranslation();
  const accessors = useMemo(() => createAccessors(t), [t]);
  const [ps, nickname] = usePSDecoder();
  return (
    <>
      <Head pageName={ps && accessors.genius.getByKey(ps.inner).summary} />
      <Header>
        {ps ? t('web.result.heading', { nickname }) : t('web.description')}
      </Header>
      <main className="md:container mx-auto text-gray-600">
        <Result />
        <FormReducer.Provider>
          <BirthForm />
        </FormReducer.Provider>
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
Component.displayName = 'Template';

export default Component;
