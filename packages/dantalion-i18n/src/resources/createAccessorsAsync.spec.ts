import type {
  Brain,
  Communication,
  Genius,
  LifeBase,
  Management,
  Motivation,
  Position,
  Response,
  Vector,
} from '@kurone-kito/dantalion-core';
import createAccessorsAsync, { createAccessors } from './createAccessorsAsync';
import createTAsync from './createTAsync';

describe('`createAccessors()` function', () => {
  it('(t) => Get the Accessors object', async () =>
    expect(createAccessors(await createTAsync({}))).toEqual({
      brain: expect.any(Object),
      communication: expect.any(Object),
      genius: expect.any(Object),
      getDescription: expect.any(Function),
      lifeBase: expect.any(Object),
      management: expect.any(Object),
      motivation: expect.any(Object),
      position: expect.any(Object),
      response: expect.any(Object),
      vector: expect.any(Object),
    }));
});
describe('`createAccessorsAsync()` function', () => {
  it('Get the (Accessors & i18next.WithT) object', async () =>
    expect(await createAccessorsAsync()).toEqual({
      brain: expect.any(Object),
      communication: expect.any(Object),
      genius: expect.any(Object),
      getDescription: expect.any(Function),
      lifeBase: expect.any(Object),
      management: expect.any(Object),
      motivation: expect.any(Object),
      position: expect.any(Object),
      response: expect.any(Object),
      t: expect.any(Function),
      vector: expect.any(Object),
    }));
});
describe.each([
  ['createAccessors', async () => createAccessors(await createTAsync({}))],
  ['createAccessorsAsync', createAccessorsAsync],
])('`%s()` function', (__, func) => {
  describe('`Accessors.brain.getByKey()` method', () => {
    it.each<Brain>(['left', 'right'])(
      '("%s") => Get the specified object',
      async (key) =>
        expect((await func()).brain.getByKey(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('`Accessors.brain.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).brain.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
  });
  describe('`Accessors.communication.getByKey()` method', () => {
    it.each<Communication>(['fix', 'flex'])(
      '("%s") => Get the specified object',
      async (key) =>
        expect((await func()).communication.getByKey(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('`Accessors.communication.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).communication.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
  });
  describe('`Accessors.genius.getByKey()` method', () => {
    it.each<Genius>([
      '000',
      '001',
      '012',
      '024',
      '025',
      '100',
      '108',
      '125',
      '555',
      '789',
      '888',
      '919',
    ])('("%s") => Get the specified object', async (key) =>
      expect((await func()).genius.getByKey(key)).toEqual({
        detail: expect.any(Array),
        name: expect.any(String),
        strategy: expect.any(Array),
        summary: expect.any(String),
        weak: expect.any(Array),
      })
    );
  });
  describe('`Accessors.genius.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).genius.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        inner: expect.any(String),
        name: expect.any(String),
        outer: expect.any(String),
        workStyle: expect.any(String),
      }));
  });
  describe('`Accessors.getDescription()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).getDescription()).toEqual({
        detail: expect.any(String),
        details: expect.any(String),
        genius1: expect.any(String),
        genius2: expect.any(String),
        invalid: expect.any(String),
        personality: expect.any(String),
        strategy: expect.any(String),
        weak: expect.any(String),
      }));
    it.each(['foo', 'bar'])(
      '("%s") => includes the same string',
      async (placeholder) =>
        expect((await func()).getDescription(placeholder)).toEqual({
          detail: expect.stringContaining(placeholder),
          details: expect.any(String),
          genius1: expect.any(String),
          genius2: expect.any(String),
          invalid: expect.stringContaining(placeholder),
          personality: expect.stringContaining(placeholder),
          strategy: expect.any(String),
          weak: expect.any(String),
        })
    );
  });
  describe('`Accessors.lifeBase.getByKey()` method', () => {
    it.each<LifeBase>([
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
    ])('("%s") => Get the specified object', async (key) =>
      expect((await func()).lifeBase.getByKey(key)).toEqual(expect.any(String))
    );
  });
  describe('`Accessors.lifeBase.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).lifeBase.getCategoryDetail()).toEqual(
        expect.any(String)
      ));
  });
  describe('`Accessors.management.getByKey()` method', () => {
    it.each<Management>(['care', 'hope'])(
      '("%s") => Get the specified object',
      async (key) =>
        expect((await func()).management.getByKey(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('`Accessors.management.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).management.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
  });
  describe('`Accessors.motivation.getByKey()` method', () => {
    it.each<Motivation>([
      'competition',
      'ownMind',
      'power',
      'safety',
      'skillUp',
      'status',
    ])('("%s") => Get the specified object', async (key) =>
      expect((await func()).motivation.getByKey(key)).toEqual(
        expect.any(String)
      )
    );
  });
  describe('`Accessors.motivation.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).motivation.getCategoryDetail()).toEqual(
        expect.any(String)
      ));
  });
  describe('`Accessors.position.getByKey()` method', () => {
    it.each<Position>(['adjust', 'brain', 'direct', 'quick'])(
      '("%s") => Get the specified object',
      async (key) =>
        expect((await func()).position.getByKey(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('`Accessors.position.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).position.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
  });
  describe('`Accessors.response.getByKey()` method', () => {
    it.each<Response>(['action', 'mind'])(
      '("%s") => Get the specified object',
      async (key) =>
        expect((await func()).response.getByKey(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('`Accessors.response.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).response.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
  });
  describe('`Accessors.vector.getByKey()` method', () => {
    it.each<Vector>(['authority', 'economically', 'humanely'])(
      '("%s") => Get the specified object',
      async (key) =>
        expect((await func()).vector.getByKey(key)).toEqual({
          detail: expect.any(Array),
          name: expect.any(String),
          strategy: expect.any(Array),
        })
    );
  });
  describe('`Accessors.vector.getCategoryDetail()` method', () => {
    it('Get the specified object', async () =>
      expect((await func()).vector.getCategoryDetail()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
  });
});
