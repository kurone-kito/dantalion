/** A date represented by its calendar components. */
export interface CalendarDate {
  /** The day of the month. */
  readonly date: number;
  /** The month from 1 to 12. */
  readonly month: number;
  /** The full calendar year. */
  readonly year: number;
}
