import { ReactElement } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text?: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  text,
  startIcon,
  onClick,
}) => {
  const variantClasses = {
    primary:
      'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    secondary:
      'bg-purple-200 text-purple-600 hover:bg-purple-300 focus:ring-purple-400',
  };



  return (
    <button
      className={`px-4 py-2 rounded-md font-light flex items-center ${variantClasses[variant]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
      onClick={onClick}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
};

export default Button;