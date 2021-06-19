import type { VFC } from 'react';
import Logo from '../atoms/Logo';

export interface Props {
  readonly __?: unknown;
}

const Component: VFC<Props> = () => (
  <header className="bg-gray-200 flex">
    <h1>
      <Logo />
    </h1>
  </header>
);
Component.displayName = 'HeroHeader';

export default Component;
