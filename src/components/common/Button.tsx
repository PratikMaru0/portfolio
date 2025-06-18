import type { ReactNode } from "react";

interface ButtonProps {
  text?: string;
  style?: string;
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button = (props: ButtonProps) => {
  const { text, style, onClick, children } = props;

  return (
    <button
      className={`flex items-center justify-center border border-gray-300 rounded-full px-5 py-2 hover:border-pink-400 transition-colors ${style}`}
      onClick={onClick}
      type={props.type}
    >
      {children ? children : text}
    </button>
  );
};

export default Button;
