import {
  Detail,
  Genius,
  Personality,
  getDetail,
  toCC,
} from '@kurone-kito/dantalion-core';
import type { Accessors } from '../resources/createAccessorsAsync';
import article from './article';
import { detailsBase, detailsMore } from './details';
import { createFromGenius, fromGeniusForPersonality } from './genius';
import { line } from './list';
import { fromLifeBase, fromMotivation, fromVector } from './specialized';

/**
 * Create the Markdown only accompany resources.
 * @param source The source.
 */
const onlyAccompanying = (
  source: Pick<
    Detail,
    | 'brain'
    | 'communication'
    | 'management'
    | 'motivation'
    | 'position'
    | 'response'
  >,
  accessors: Pick<
    Accessors,
    | 'brain'
    | 'communication'
    | 'management'
    | 'motivation'
    | 'position'
    | 'response'
  >
) =>
  line(
    detailsBase({ src: accessors.brain.getCategoryDetail() }),
    detailsMore({ src: accessors.brain.getByKey(source.brain) }),
    detailsBase({ src: accessors.communication.getCategoryDetail() }),
    detailsMore({
      src: accessors.communication.getByKey(source.communication),
    }),
    detailsBase({ src: accessors.management.getCategoryDetail() }),
    detailsMore({ src: accessors.management.getByKey(source.management) }),
    detailsBase({ src: accessors.response.getCategoryDetail() }),
    detailsMore({ src: accessors.response.getByKey(source.response) }),
    detailsBase({ src: accessors.position.getCategoryDetail() }),
    detailsMore({ src: accessors.position.getByKey(source.position) }),
    fromMotivation(accessors.motivation, source.motivation)
  );

/**
 * Create the Markdown from detail.
 * @param type The type of genius
 * @param source The source.
 */
export const createDetailsTemplate = (
  type: Genius,
  source: Detail,
  accessors: Accessors
): string => {
  const desc = accessors.getDescription();
  return line(
    detailsBase({ src: accessors.vector.getCategoryDetail() }),
    fromVector(desc.strategy, accessors.vector.getByKey(source.vector)),
    detailsBase({ src: accessors.genius.getCategoryDetail() }),
    createFromGenius(desc)(accessors.genius.getByKey(type), 3),
    onlyAccompanying(source, accessors)
  );
};

/**
 * Create the Markdown from the birthday.
 * @param source The source.
 * @param accessors
 */
export const createPersonalityTemplate = (
  source: Personality,
  accessors: Accessors
): string => {
  const details = getDetail(source.inner);
  const { cc, strategy } = accessors.getDescription();
  return line(
    detailsBase({ src: accessors.vector.getCategoryDetail() }),
    fromVector(strategy, accessors.vector.getByKey(details.vector)),
    fromGeniusForPersonality(source, accessors),
    onlyAccompanying(details, accessors),
    fromLifeBase(accessors.lifeBase, source.lifeBase),
    article({ head: cc, body: toCC(source), level: 2 })
  );
};
