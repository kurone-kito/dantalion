import type {
  Brain,
  Communication,
  Genius,
  Management,
  Motivation,
  Position,
  Response,
  Vector,
} from '@kurone-kito/dantalion-core';
import {
  brain,
  communication,
  genius,
  management,
  motivation,
  position,
  response,
  vector,
} from '.';

describe('integration testing', () => {
  describe('The `brain` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await brain.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
    it.each<Brain>(['left', 'right'])('getAsync(%s) method', async (key) =>
      expect(await brain.getAsync(key)).toEqual({
        detail: expect.any(String),
        more: expect.any(Array),
        name: expect.any(String),
      })
    );
  });
  describe('The `communication` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await communication.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
    it.each<Communication>(['fix', 'flex'])(
      'getAsync(%s) method',
      async (key) =>
        expect(await communication.getAsync(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('The `genius` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await genius.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
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
    ])('getAsync(%s) method', async (key) =>
      expect(await genius.getAsync(key)).toEqual({
        detail: expect.any(Array),
        keyword: expect.any(Array),
        name: expect.any(String),
        strategy: expect.any(Array),
        summary: expect.any(String),
        weak: expect.any(Array),
      })
    );
  });
  describe('The `management` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await management.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
    it.each<Management>(['care', 'hope'])('getAsync(%s) method', async (key) =>
      expect(await management.getAsync(key)).toEqual({
        detail: expect.any(String),
        more: expect.any(Array),
        name: expect.any(String),
      })
    );
  });
  describe('The `motivation` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await motivation.getCategoryDetailAsync()).toEqual(
        expect.any(String)
      ));
    it.each<Motivation>([
      'competition',
      'ownMind',
      'power',
      'safety',
      'skillUp',
      'status',
    ])('getAsync(%s) method', async (key) =>
      expect(await motivation.getAsync(key)).toEqual(expect.any(String))
    );
  });
  describe('The `position` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await position.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
    it.each<Position>(['adjust', 'brain', 'direct', 'quick'])(
      'getAsync(%s) method',
      async (key) =>
        expect(await position.getAsync(key)).toEqual({
          detail: expect.any(String),
          more: expect.any(Array),
          name: expect.any(String),
        })
    );
  });
  describe('The `response` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await response.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
    it.each<Response>(['action', 'mind'])('getAsync(%s) method', async (key) =>
      expect(await response.getAsync(key)).toEqual({
        detail: expect.any(String),
        more: expect.any(Array),
        name: expect.any(String),
      })
    );
  });
  describe('The `vector` instance', () => {
    it('getCategoryDetailAsync() method', async () =>
      expect(await vector.getCategoryDetailAsync()).toEqual({
        detail: expect.any(String),
        name: expect.any(String),
      }));
    it.each<Vector>(['authority', 'economically', 'humanely'])(
      'getAsync(%s) method',
      async (key) =>
        expect(await vector.getAsync(key)).toEqual({
          detail: expect.any(Array),
          name: expect.any(String),
          strategy: expect.any(Array),
        })
    );
  });
});