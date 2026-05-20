import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="w-full mt-4">
      <div className="bg-red-50 border border-red-300 rounded-lg px-6 py-4 flex items-center gap-3">
        <span className="text-red-600 text-sm font-normal flex-1">
          {message}
        </span>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
