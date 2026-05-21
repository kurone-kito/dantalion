/**
 * The heavenly stem (天干, Tian Gan) — the ten-phase sub-personality cycle.
 *
 * | Value | Stem |
 * | :---: | :--: |
 * |   1   |  甲  |
 * |   2   |  乙  |
 * |   3   |  丙  |
 * |   4   |  丁  |
 * |   5   |  戊  |
 * |   6   |  己  |
 * |   7   |  庚  |
 * |   8   |  辛  |
 * |   9   |  壬  |
 * |  10   |  癸  |
 */
export type HeavenlyStem = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** The list of heavenly stem values. */
export default Object.freeze<HeavenlyStem[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
