import React from 'react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onActionNotification?: (id: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onActionNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-inverse-surface/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col border-l border-outline-variant/30 animate-in slide-in-from-right duration-200">
        <div className="p-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-surface-container text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[17px]">notifications_active</span>
            </span>
            <div>
              <h3 className="font-bold text-on-surface text-[13px]">Freshness &amp; IoT Alerts</h3>
              <p className="text-on-surface-variant text-[10.5px]">
                Real-time telemetry from Anand &amp; Kheda cold hubs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-space-md space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-lg border transition-all ${
                n.type === 'critical'
                  ? 'bg-error-container/20 border-error/30'
                  : n.type === 'success'
                  ? 'bg-primary-fixed/20 border-primary/30'
                  : 'bg-surface-container-low border-outline-variant/30'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5 ${
                    n.type === 'critical'
                      ? 'text-error'
                      : n.type === 'success'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                >
                  {n.type === 'critical'
                    ? 'notification_important'
                    : n.type === 'success'
                    ? 'check_circle'
                    : 'info'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-label-lg text-label-lg font-bold text-on-surface truncate text-[13px]">
                      {n.title}
                    </h4>
                    <span className="font-label-md text-label-md text-on-surface-variant text-[11px] flex-shrink-0">
                      {n.timeAgo}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] mt-1 leading-snug">
                    {n.description}
                  </p>
                  {n.actionable && onActionNotification && (
                    <button
                      onClick={() => onActionNotification(n.id)}
                      className="mt-2 text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                      type="button"
                    >
                      <span>Acknowledge &amp; Dispatch Fleet</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-[12px]">
          <span className="text-on-surface-variant font-medium">18 Active IoT probes reporting</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-[12px]"
            type="button"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
