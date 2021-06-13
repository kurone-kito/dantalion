import type { LifeBase, Motivation } from '@kurone-kito/dantalion-core';
import type { Accessors } from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import InlineMarkdown from '../atoms/InlineMarkdown';
import ResultFrame from '../atoms/ResultFrame';
import TupleList from '../molecules/TupleList';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the accessor object */
  readonly accessors: Pick<
    Accessors,
    'getDescription' | 'lifeBase' | 'motivation'
  >;
  /** Specifies the CC number */
  readonly cc: string;
  /** Specifies the lifebase value */
  readonly lifeBase: LifeBase;
  /** Specifies the motivation value */
  readonly motivation: Motivation;
}

/** The result component. */
const Component: VFC<Props> = ({ accessors, cc, lifeBase, motivation }) => (
  <ResultFrame>
    <TupleList className="list-disc pl-8">
      {[
        [
          accessors.lifeBase.getCategoryDetail(),
          accessors.lifeBase.getByKey(lifeBase).name,
        ],
        [
          accessors.motivation.getCategoryDetail(),
          accessors.motivation.getByKey(motivation),
        ],
        [
          accessors.getDescription().cc,
          <InlineMarkdown>{`\`${cc}\``}</InlineMarkdown>,
        ],
      ]}
    </TupleList>
  </ResultFrame>
);
Component.displayName = 'LifeBaseResultDetail';

export default Component;
