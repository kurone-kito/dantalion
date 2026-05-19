/**
 * Assert that a value is not `undefined`.
 *
 * Used at call sites where the caller knows by invariant that a
 * value is defined (e.g., lookup-table accesses with statically-bound
 * indices) but the TypeScript narrowing under
 * `noUncheckedIndexedAccess` cannot infer the guarantee. Throws if
 * the invariant is violated.
 *
 * @param value The value to assert.
 * @param message Optional error message thrown on violation.
 * @returns `value` with `undefined` narrowed away.
 */
export default <T>(value: T | undefined, message?: string): T => {
  if (value === undefined) {
    throw new Error(message ?? 'assertDefined: value is undefined');
  }
  return value;
};
