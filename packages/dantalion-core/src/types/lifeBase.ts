/**
 * The types that the base of ego.
 *
 * |      Key       | Value                                                                    |
 * | :------------: | :----------------------------------------------------------------------- |
 * | `application`  | This type of person would like to self-experience seriously.             |
 * | `association`  | This type of person would like to do it immediately when they think.     |
 * | `development`  | This type of person would like to be perfectionists.                     |
 * |  `expression`  | This type of person would like to be honest with themselves.             |
 * |   `finance`    | This type of person would like to put everything within eye reach.       |
 * |  `investment`  | This type of person would like to be a down-to-earth collector.          |
 * | `organization` | This type of person would like to live as a member of a group.           |
 * |    `quest`     | This type of person would like to learn from the wisdom of our pioneers. |
 * |   `selfMind`   | This type of person would like to be a leader of the team.               |
 * | `selfReliance` | This type of person would like to be a lone wolf.                        |
 */
export type LifeBase =
  | 'application'
  | 'association'
  | 'development'
  | 'expression'
  | 'finance'
  | 'investment'
  | 'organization'
  | 'quest'
  | 'selfMind'
  | 'selfReliance';

/** The list that the base of ego type. */
export default Object.freeze<LifeBase[]>([
  'application',
  'association',
  'development',
  'expression',
  'finance',
  'investment',
  'organization',
  'quest',
  'selfMind',
  'selfReliance',
]);
