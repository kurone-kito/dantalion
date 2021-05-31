import type { DetailsBaseType, DetailsType } from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import InlineMarkdown from '../atoms/InlineMarkdown';
import ResultDetail from '../molecules/ResultDetail';

/** Type definition of the required attributes. */
export interface Props {
  readonly content: DetailsType;
  readonly heading: DetailsBaseType;
  /** Specifies the nickname. */
  readonly nickname?: string;
}

const Component: VFC<Props> = ({ content, heading, nickname }) => {
  const { t } = useTranslation();
  return (
    <ResultDetail
      hookAdditional={<InlineMarkdown>{content.detail}</InlineMarkdown>}
      heading={heading.name}
      headingDetail={heading.detail}
      hook={
        <InlineMarkdown>
          {t('web.result.probed', { nickname, type: content.name })}
        </InlineMarkdown>
      }
      moreDetail={content.more}
    />
  );
};
Component.displayName = 'ResultDetail';

export default Component;
