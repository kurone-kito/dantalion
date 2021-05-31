import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import TweetButton from '../molecules/TweetButton';

/** Type definition of the required attributes. */
export interface Props {
  readonly hooks?: string;
  /** Specifies the nickname. */
  readonly nickname?: string;
}

/** Tweet button component. */
const Component: VFC<Props> = ({ hooks, nickname }) => {
  const { t } = useTranslation();
  return (
    <TweetButton
      hashtag={t('web.share.hashtag')}
      text={[t('web.result.heading', { nickname }), hooks].join('\n')}
      url={window.location.href}
    >
      {t('web.share.tweet')}
    </TweetButton>
  );
};
Component.displayName = 'TweetButton';

export default Component;
