import { describe, expect, it } from 'vitest';
import type { HeavenlyStem } from '../types/heavenlyStem.js';
import type { Personality } from './getPersonality.js';
import toCC from './toCC.js';

const samplePersonality: Personality = {
  cycle: 1,
  inner: '888',
  outer: '789',
  workStyle: '125',
  lifeBase: 'application',
  potentials: ['Io', 'Ii'],
};

describe('toCC', () => {
  it('matches the documented CC format <inner>-<outer>-<workStyle>-<inner><c1>-<lifeBaseCC>-<potentialCC>-<potentialCC>', () => {
    const cc = toCC(samplePersonality);
    expect(cc).toMatch(/^\d{3}-\d{3}-\d{3}-\d{3}\d-[A-Z]-[a-z]-[a-z]$/);
  });

  it('encodes inner concatenated with cycle % 10 in the 4th segment', () => {
    const cc = toCC({ ...samplePersonality, cycle: 1 });
    expect(cc.split('-')[3]).toBe('8881');
  });

  it('uses 0 as the suffix when cycle is 10 (cycle % 10 wraps)', () => {
    const cc = toCC({ ...samplePersonality, cycle: 10 });
    expect(cc.split('-')[3]).toBe('8880');
  });

  it.each<[HeavenlyStem, string]>([
    [1, '1'],
    [2, '2'],
    [5, '5'],
    [9, '9'],
    [10, '0'],
  ])('cycle %i → CC 4th-segment suffix "%s"', (cycle, suffix) => {
    const cc = toCC({ ...samplePersonality, cycle });
    const seg = cc.split('-')[3];
    expect(seg).toBeDefined();
    expect(seg).toBe(`888${suffix}`);
  });

  it('reverses potentials via reduceRight (potentialCC["Io"]="a", potentialCC["Ii"]="b", reversed → "-b-a" suffix)', () => {
    const cc = toCC({ ...samplePersonality, potentials: ['Io', 'Ii'] });
    // reduceRight visits the last element first, so for ['Io', 'Ii']
    // the suffix is `-${cc[Ii]}-${cc[Io]}` = `-b-a`.
    expect(cc.endsWith('-b-a')).toBe(true);
  });

  it('emits inner / outer / workStyle in their declared order', () => {
    const cc = toCC(samplePersonality);
    const [a, b, c] = cc.split('-');
    expect(a).toBe(samplePersonality.inner);
    expect(b).toBe(samplePersonality.outer);
    expect(c).toBe(samplePersonality.workStyle);
  });

  it('embeds the single-letter lifeBaseCC token in the 5th segment', () => {
    const cc = toCC(samplePersonality);
    const seg = cc.split('-')[4];
    expect(seg).toBeDefined();
    expect(seg).toMatch(/^[A-Z]$/);
    // application maps to 'G' per types/lifeBase.ts.
    expect(seg).toBe('G');
  });
});
