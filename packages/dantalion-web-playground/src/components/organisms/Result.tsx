import { getDetail } from '@kurone-kito/dantalion-core';
import { createAccessors } from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { usePSDecoder } from '../../hooks/usePersonality';
import AccompanyingResult from './AccompanyingResult';
import GeniusResultDetail from './GeniusResultDetail';
import LifeBaseResultDetail from './LifeBaseResultDetail';
import TweetButton from './TweetButton';
import VectorResultDetail from './VectorResultDetail';

/** The result component. */
const Component: VFC = () => {
  const { t } = useTranslation();
  const accessors = createAccessors(t);
  const [ps, nickname] = usePSDecoder();
  const dt = ps && getDetail(ps.inner);
  return ps && dt ? (
    <>
      <article>
        <VectorResultDetail
          accessor={accessors.vector}
          nickname={nickname}
          strategy={accessors.getDescription().strategy}
          vector={dt.vector}
        />
        <GeniusResultDetail
          descriptions={accessors.getDescription()}
          details={accessors.genius.getCategoryDetail()}
          inner={accessors.genius.getByKey(ps.inner)}
          nickname={nickname}
          outer={accessors.genius.getByKey(ps.outer)}
          workStyle={accessors.genius.getByKey(ps.workStyle)}
        />
        <LifeBaseResultDetail
          accessors={accessors}
          lifeBase={ps.lifeBase}
          motivation={dt.motivation}
        />
        <AccompanyingResult
          accessors={accessors}
          details={dt}
          nickname={nickname}
        />
      </article>
      <aside>
        <TweetButton
          nickname={nickname}
          hooks={accessors.genius.getByKey(ps.inner).summary}
        />
      </aside>
    </>
  ) : null;
};
Component.displayName = 'Result';

export default Component;
