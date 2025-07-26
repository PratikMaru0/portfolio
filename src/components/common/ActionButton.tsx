import type { ReactNode } from "react";

interface ButtonProps {
  text?: string | ReactNode;
  style?: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

const ActionButton = (props: ButtonProps) => {
  const { text, style, onClick, children, disabled, hidden } = props;

  return (
    <button
      className={`rounded-full bg-primary/20 text-themeText px-1 py-1 hover:bg-primary/70 transition-colors ${style}`}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
    >
      {children ? children : text}
    </button>
  );
};

export default ActionButton;
