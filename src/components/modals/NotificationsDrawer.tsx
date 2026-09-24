import React from 'react';
import { NotificationItem } from '../../types';
import { Icon, Badge, cn } from '../ui';

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

  const toneFor = (type: string): { badge: 'bad' | 'good' | 'neutral'; icon: string } => {
    if (type === 'critical') return { badge: 'bad', icon: 'notification_important' };
    if (type === 'success') return { badge: 'good', icon: 'check_circle' };
    return { badge: 'neutral', icon: 'info' };
  };

  return (
    <div className="kf-overlay flex justify-end">
      <div className="kf-drawer-in flex h-full w-full max-w-md flex-col border-l border-line bg-surface shadow-drawer">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="notifications_active" size={17} />
            </span>
            <div>
              <h3 className="text-[14px] font-semibold text-ink">Freshness &amp; IoT Alerts</h3>
              <p className="kf-helper">Real-time telemetry from Anand &amp; Kheda cold hubs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-ink"
            type="button"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {notifications.map((n) => {
            const t = toneFor(n.type);
            return (
              <div
                key={n.id}
                className={cn(
                  'rounded-xl border p-3.5',
                  n.type === 'critical'
                    ? 'border-bad/30 bg-bad-bg'
                    : n.type === 'success'
                      ? 'border-good/30 bg-good-bg'
                      : 'border-line bg-subtle',
                )}
              >
                <div className="flex items-start gap-2.5">
                  <Icon name={t.icon} size={18} className={cn('mt-0.5 shrink-0', n.type === 'critical' ? 'text-bad' : n.type === 'success' ? 'text-good' : 'text-primary')} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="truncate text-[13px] font-semibold text-ink">{n.title}</h4>
                      <span className="shrink-0 text-[11px] text-faint">{n.timeAgo}</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-muted">{n.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge tone={t.badge}>{n.type === 'critical' ? 'Action required' : n.type === 'success' ? 'Resolved' : 'Info'}</Badge>
                      {n.actionable && onActionNotification && (
                        <button
                          onClick={() => onActionNotification(n.id)}
                          className="flex items-center gap-1 text-[11.5px] font-bold text-primary hover:underline"
                          type="button"
                        >
                          Acknowledge &amp; Dispatch Fleet <Icon name="arrow_forward" size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-subtle px-5 py-3.5">
          <span className="kf-helper">18 Active IoT probes reporting</span>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-ink hover:bg-surface"
            type="button"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};