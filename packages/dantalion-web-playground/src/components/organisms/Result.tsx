import { getDetail } from '@kurone-kito/dantalion-core';
import { createAccessors } from '@kurone-kito/dantalion-i18n';
import { useMemo, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { usePSDecoder } from '../../hooks/usePersonality';
import AccompanyingResult from './AccompanyingResult';
import GeniusResultDetail from './GeniusResultDetail';
import LifeBaseResultDetail from './LifeBaseResultDetail';
import MotivationResultDetail from './MotivationResultDetail';
import PotentialResultDetail from './PotentialResultDetail';
import PersonalityFileId from './PersonalityFileId';
import SubGeniusResultDetail from './SubGeniusResultDetail';
import TweetButton from './TweetButton';
import VectorResultDetail from './VectorResultDetail';

/** The result component. */
const Component: VFC = () => {
  const { t } = useTranslation();
  const accessors = useMemo(() => createAccessors(t), [t]);
  const [ps, nickname] = usePSDecoder();
  const dt = ps && getDetail(ps.inner);
  const descriptions = accessors.getDescription();
  const geniusDetails = accessors.genius.getCategoryDetail();
  const innerDetail = ps && accessors.genius.getByKey(ps.inner);
  return ps && dt && innerDetail ? (
    <>
      <article>
        <VectorResultDetail
          accessor={accessors.vector}
          nickname={nickname}
          strategy={descriptions.strategy}
          vector={dt.vector}
        />
        <GeniusResultDetail
          descriptions={descriptions}
          details={geniusDetails}
          inner={innerDetail}
          nickname={nickname}
        >
          <SubGeniusResultDetail
            descriptions={descriptions}
            details={geniusDetails}
            inner={innerDetail}
            outer={accessors.genius.getByKey(ps.outer)}
            workStyle={accessors.genius.getByKey(ps.workStyle)}
          />
        </GeniusResultDetail>
        <LifeBaseResultDetail
          accessors={accessors.lifeBase}
          lifeBase={ps.lifeBase}
          nickname={nickname}
        />
        <PotentialResultDetail
          accessors={accessors.potential}
          potentials={ps.potentials}
          nickname={nickname}
        />
        <MotivationResultDetail
          accessors={accessors.motivation}
          motivation={dt.motivation}
        />
        <AccompanyingResult
          accessors={accessors}
          details={dt}
          nickname={nickname}
        />
        <PersonalityFileId personality={ps} />
      </article>
      <aside>
        <TweetButton nickname={nickname} hooks={innerDetail.summary} />
      </aside>
    </>
  ) : null;
};
Component.displayName = 'Result';

export default Component;
