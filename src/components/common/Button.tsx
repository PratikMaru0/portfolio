import type { ReactNode } from "react";

interface ButtonProps {
  text?: string | ReactNode;
  style?: string;
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  hidden?: boolean;
}

const Button = (props: ButtonProps) => {
  const { text, style, onClick, children, type, disabled, hidden } = props;

  return (
    <button
      className={`flex items-center justify-center border border-gray-300 rounded-full px-5 py-2  hover:border-primary/70 transition-colors ${
        type === "submit" ? "bg-primary text-white" : ""
      } ${style}`}
      onClick={onClick}
      type={props.type}
      disabled={disabled}
      hidden={hidden}
    >
      {children ? children : text}
    </button>
  );
};

export default Button;
