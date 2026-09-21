/**
 * The types for response.
 *
 * |   Key    | Value                                                                 |
 * | :------: | :-------------------------------------------------------------------- |
 * | `action` | This type of person would like to always act with customers.          |
 * |  `mind`  | This type of person would like to always act with only known peoples. |
 */
export type Response = 'action' | 'mind';

/** The list of the types that the response. */
export default Object.freeze<Response[]>(['action', 'mind']);
