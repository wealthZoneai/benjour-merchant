import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset'; 
    onClick?: () => void; 
    disabled?: boolean; 
    className?: string; 
    size?: 'small' | 'medium' | 'large' | 'default';
    children: React.ReactNode; 
  }

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled,
  className,
  size = 'medium',
  children,
}) => {
    const sizeClasses = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
        default: 'px-4 py-2 text-base', 
      };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` rounded-[8px] text-white ${sizeClasses[size]} ${className}
    ${disabled ? 'cursor-default bg-gray-400 opacity-50' : 'cursor-pointer bg-green-500 hover:bg-green-600'}}`}
    >
      {children}
    </button>
  );
};

export default Button;