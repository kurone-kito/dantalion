/**
 * The types for role.
 *
 * |   Key    | Value                                                |
 * | :------: | :--------------------------------------------------- |
 * | `action` | This type of person would like to blue-collar role.  |
 * |  `mind`  | This type of person would like to white-collar role. |
 */
export type Response = 'action' | 'mind';

/** The list of the types that the role. */
export default Object.freeze<Response[]>(['action', 'mind']);
