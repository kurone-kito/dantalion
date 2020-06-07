import createGeniusRecord from './createGeniusRecord';

/**
 * Create a record for each genius type from the source.
 * @param table Source.
 * @template T Type of the source.
 */
export default <T>(table: T[][]) =>
  createGeniusRecord(table.map((row) => createGeniusRecord(row)));
