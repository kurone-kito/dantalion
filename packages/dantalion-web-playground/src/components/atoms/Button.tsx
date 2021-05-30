import classNames, { Argument } from 'classnames';
import type { MouseEventHandler, ReactNode, VFC } from 'react';

/** Type definition of the required attributes. */
export interface Props {
  /** If you need the CSS classes on a button, specify them */
  readonly buttonClassName?: Argument;
  /** The children items */
  readonly children?: ReactNode;
  /** If you need the CSS classes, specify them */
  readonly className?: Argument;
  /** Callback to call when the user taps */
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Whether the button use submit mode */
  readonly submit?: boolean;
}

/** The button component */
const Component: VFC<Props> = ({
  buttonClassName,
  children,
  className,
  onClick,
  submit,
}) => (
  <div className={classNames('flex justify-center pt-8', className)}>
    <button
      className={classNames(
        'duration-200 ease-in-out flex-grow font-bold leading-5 nm-flat-gray-300 px-8 py-4 rounded-full tracking-widest transform transition uppercase hover:nm-flat-gray-50-lg',
        buttonClassName
      )}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  </div>
);
Component.displayName = 'Button';

export default Component;
