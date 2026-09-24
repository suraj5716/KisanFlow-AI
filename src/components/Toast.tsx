import React from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'warning';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-12 right-6 bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-lg shadow-xl flex items-center gap-space-xs transition-all duration-300 z-50 animate-bounce-short border border-outline-variant/30"
    >
      <span className="material-symbols-outlined text-primary-fixed text-[20px]">
        {type === 'warning' ? 'warning' : 'check_circle'}
      </span>
      <span className="font-body-sm text-body-sm font-medium text-[13px]">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-inverse-on-surface/70 hover:text-inverse-on-surface p-1"
        type="button"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
