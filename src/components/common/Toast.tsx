import { useEffect, useState } from "react";

interface ToastProps {
  type: string;
  message: string;
  duration?: number;
}

const Toast = ({ message, type, duration = 3000 }: ToastProps) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  }, []);

  if (!showToast) {
    return null;
  }

  return (
    <div className="toast toast-bottom toast-start">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
