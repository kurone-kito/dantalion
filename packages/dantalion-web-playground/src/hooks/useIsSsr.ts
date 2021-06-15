import { useCallback } from 'react';

export type IsSsr = (invert?: boolean) => boolean;

const useIsSsr = (): IsSsr =>
  useCallback<IsSsr>(
    (n) => (n ? typeof window !== 'undefined' : typeof window === 'undefined'),
    []
  );

export default useIsSsr;
