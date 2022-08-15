import { FC, ReactNode } from 'react';

interface ButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'default' | 'large';
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  color = 'primary',
  size = 'default',
}) => {
  return (
    <button
      className={`${
        size === 'small'
          ? `px-4 py-2`
          : size === 'large'
          ? `px-12 py-6`
          : ` px-8 py-4`
      } rounded-md inline-flex ${
        color === 'primary'
          ? `bg-blue-700 hover:bg-blue-400 active:bg-blue-400`
          : 'bg-green-700 hover:bg-green-400 active:bg-green-400'
      } text-white transition-colors`}
    >
      {children}
    </button>
  );
};
