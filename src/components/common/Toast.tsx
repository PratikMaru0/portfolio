import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  status?: number;
}

const Toast = ({ message, duration = 3000, status = 200 }: ToastProps) => {
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
      <div
        className={`alert ${status === 200 ? "alert-success" : "alert-error"}`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
