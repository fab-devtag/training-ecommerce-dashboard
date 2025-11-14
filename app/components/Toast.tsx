"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}
export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
      {message}
    </div>
  );
};
