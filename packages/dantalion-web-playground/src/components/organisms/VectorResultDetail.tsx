import type { Vector } from '@kurone-kito/dantalion-core';
import type { Accessors } from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react-markdown';
import Details from '../molecules/Details';
import ResultDetail from '../molecules/ResultDetail';

/** Type definition of the required attributes. */
export interface Props {
  readonly accessor: Accessors['vector'];
  /** Specifies the nickname. */
  readonly nickname?: string;
  readonly strategy?: ReactNode;
  readonly vector: Vector;
}

const Component: VFC<Props> = ({ accessor, nickname, strategy, vector }) => {
  const { t } = useTranslation();
  const heading = accessor.getCategoryDetail();
  const detail = accessor.getByKey(vector);
  return (
    <ResultDetail
      heading={heading.name}
      headingDetail={heading.detail}
      hook={t('web.result.probed', { nickname, type: detail.name })}
      moreDetail={detail.detail}
    >
      <Details caption={strategy} tooltip={t('web.tooltip.summary')}>
        {detail.strategy}
      </Details>
    </ResultDetail>
  );
};
Component.displayName = 'VectorResultDetail';

export default Component;
