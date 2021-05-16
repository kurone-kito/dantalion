import {
  Detail,
  Genius,
  Personality,
  getDetail,
} from '@kurone-kito/dantalion-core';
import {
  brain,
  communication,
  genius,
  management,
  position,
  response,
  vector,
} from '../resources/accessors';
import { detailsBase, detailsMore } from './details';
import { fromGeniusAsync, fromGeniusForPersonalityAsync } from './genius';
import { line } from './list';
import {
  fromLifeBaseAsync,
  fromMotivationAsync,
  fromVectorAsync,
} from './specialized';

/**
 * Create the Markdown only accompany resources.
 * @param source The source.
 */
const onlyAccompanyingAsync = async (
  source: Pick<
    Detail,
    | 'brain'
    | 'communication'
    | 'management'
    | 'motivation'
    | 'position'
    | 'response'
  >
) =>
  line(
    detailsBase({ source: await brain.getCategoryDetailAsync() }),
    detailsMore({ source: await brain.getAsync(source.brain) }),
    detailsBase({ source: await communication.getCategoryDetailAsync() }),
    detailsMore({ source: await communication.getAsync(source.communication) }),
    detailsBase({ source: await management.getCategoryDetailAsync() }),
    detailsMore({ source: await management.getAsync(source.management) }),
    detailsBase({ source: await position.getCategoryDetailAsync() }),
    detailsMore({ source: await position.getAsync(source.position) }),
    detailsBase({ source: await response.getCategoryDetailAsync() }),
    detailsMore({ source: await response.getAsync(source.response) }),
    await fromMotivationAsync(source.motivation)
  );

/**
 * Create the Markdown from detail.
 * @param type The type of genius
 * @param source The source.
 */
export const detailsAsync = async (
  type: Genius,
  source: Detail
): Promise<string> =>
  line(
    detailsBase({ source: await vector.getCategoryDetailAsync() }),
    await fromVectorAsync(await vector.getAsync(source.vector)),
    detailsBase({ source: await genius.getCategoryDetailAsync() }),
    await fromGeniusAsync(await genius.getAsync(type), 3),
    await onlyAccompanyingAsync(source)
  );

export const personalityAsync = async (
  source: Personality
): Promise<string> => {
  const details = getDetail(source.inner);
  return line(
    detailsBase({ source: await vector.getCategoryDetailAsync() }),
    await fromVectorAsync(await vector.getAsync(details.vector)),
    await fromGeniusForPersonalityAsync(source),
    await onlyAccompanyingAsync(details),
    await fromLifeBaseAsync(source.lifeBase)
  );
};

export default undefined;
