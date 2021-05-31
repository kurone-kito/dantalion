import { Reducer, useReducer } from 'react';
import { createContainer } from 'unstated-next';

export const setBirthday = Symbol('setBirthday');

export const setNickname = Symbol('setNickname');

const defaultBirthday = '2000-01-01';

export type FormActionType = typeof setBirthday | typeof setNickname;

export type FormAction = readonly [FormActionType, string | undefined];

export interface FormState {
  readonly birthday: string;
  readonly nickname: string;
}

const formReducer: Reducer<FormState, FormAction> = (
  state,
  [type, payload]
) => {
  switch (type) {
    case setBirthday:
      return { ...state, birthday: payload ?? defaultBirthday };
    case setNickname:
      return { ...state, nickname: payload ?? '' };
    default:
      return state;
  }
};

export default createContainer(() =>
  useReducer(formReducer, { birthday: defaultBirthday, nickname: '' })
);
