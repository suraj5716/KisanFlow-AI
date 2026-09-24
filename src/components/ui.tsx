import React from 'react';

/* ============================================================
   KisanFlow AI — Shared UI primitives
   ============================================================ */

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 18, className }) => (
  <span
    aria-hidden
    className={cn('material-symbols-outlined select-none', className)}
    style={{ fontSize: size, lineHeight: 1 }}
  >
    {name}
  </span>
);

/* ---------- Page header ---------- */

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions, eyebrow }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0">
      <h1 className="kf-page-title">{title}</h1>
      {subtitle && <p className="kf-helper mt-1.5 max-w-2xl">{subtitle}</p>}
      {eyebrow && <p className="kf-eyebrow mb-1">{eyebrow}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2 flex-shrink-0">{actions}</div>}
  </div>
);

/* ---------- Section ---------- */

interface SectionProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  spacing?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, subtitle, action, children, className, spacing }) => (
  <section className={cn(spacing !== false && 'mt-8', className)}>
    {(title || action) && (
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          {title && <h2 className="kf-section-title">{title}</h2>}
          {subtitle && <p className="kf-helper mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    )}
    {children}
  </section>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('kf-card', className)}>{children}</div>
);

export const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('kf-panel', className)}>{children}</div>
);

/* ---------- Metric (compact stat block) ---------- */

interface MetricProps {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: 'good' | 'warn' | 'bad' | 'default';
  accent?: boolean;
}

export const Metric: React.FC<MetricProps> = ({ label, value, hint, tone = 'default', accent }) => {
  const toneColor =
    tone === 'good' ? 'text-good' : tone === 'warn' ? 'text-warn' : tone === 'bad' ? 'text-bad' : 'text-ink';
  return (
    <div className={cn('bg-surface border border-line rounded-lg px-4 py-3.5', accent && 'border-primary/40')}>
      <p className="kf-eyebrow">{label}</p>
      <p className={cn('kf-metric-value mt-1.5', toneColor)}>{value}</p>
      {hint && <p className="kf-helper mt-1.5">{hint}</p>}
    </div>
  );
};

export const MetricStrip: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4', className)}>{children}</div>
);

/* ---------- Badge ---------- */

type BadgeTone = 'good' | 'warn' | 'bad' | 'info' | 'neutral' | 'primary';

export const Badge: React.FC<{ tone?: BadgeTone; dot?: boolean; children: React.ReactNode; className?: string }> = ({
  tone = 'neutral',
  dot,
  children,
  className,
}) => (
  <span className={cn('kf-badge', `kf-badge-${tone}`, className)}>
    {dot && <span className="dot" />}
    {children}
  </span>
);

/* ---------- Button ---------- */

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
  }
> = ({ variant = 'primary', size = 'md', icon, className, children, ...rest }) => (
  <button {...rest} className={cn('kf-btn', `kf-btn-${variant}`, size === 'sm' && 'kf-btn-sm', size === 'lg' && 'kf-btn-lg', className)}>
    {icon && <Icon name={icon} size={size === 'sm' ? 15 : size === 'lg' ? 18 : 16} />}
    {children}
  </button>
);

export const IconButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: string; label: string; size?: number }
> = ({ icon, label, size, className, ...rest }) => (
  <button {...rest} aria-label={label} title={label} className={cn('kf-icon-btn', className)}>
    <Icon name={icon} size={size} />
  </button>
);

/* ---------- Progress ---------- */

export const Progress: React.FC<{ value: number; tone?: BadgeTone; className?: string }> = ({ value, tone = 'primary', className }) => (
  <div className={cn('kf-progress', className)}>
    <div
      style={{
        width: `${Math.max(0, Math.min(100, value))}%`,
        background:
          tone === 'good'
            ? 'var(--color-good)'
            : tone === 'warn'
            ? 'var(--color-warn)'
            : tone === 'bad'
            ? 'var(--color-bad)'
            : 'var(--color-primary)',
      }}
    />
  </div>
);

/* ---------- Tabs ---------- */

export const Tabs: React.FC<{
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}> = ({ tabs, active, onChange, className }) => (
  <div className={cn('kf-tabs', className)} role="tablist">
    {tabs.map((t) => (
      <button key={t} role="tab" aria-selected={active === t} onClick={() => onChange(t)} className={cn('kf-tab', active === t && 'kf-tab-active')}>
        {t}
      </button>
    ))}
  </div>
);

/* ---------- Fields ---------- */

export const Field: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, hint, children, className }) => (
  <div className={className}>
    <label className="kf-label">{label}</label>
    {children}
    {hint && <p className="kf-helper mt-1">{hint}</p>}
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...rest }) => (
  <select {...rest} className={cn('kf-select', className)}>
    {children}
  </select>
);

/* ---------- Drawer ---------- */

export const Drawer: React.FC<{
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ open, onClose, title, subtitle, children, footer }) => {
  if (!open) return null;
  return (
    <>
      <div className="kf-overlay" onClick={onClose} />
      <aside className="kf-drawer kf-drawer-in" role="dialog" aria-modal="true">
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-line">
          <div>
            <h3 className="kf-section-title">{title}</h3>
            {subtitle && <p className="kf-helper mt-0.5">{subtitle}</p>}
          </div>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <footer className="px-5 py-4 border-t border-line bg-subtle">{footer}</footer>}
      </aside>
    </>
  );
};

/* ---------- Modal ---------- */

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}> = ({ open, onClose, title, subtitle, children, footer, width = 'max-w-lg' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="kf-overlay" onClick={onClose} />
      <div className={cn('relative w-full rounded-xl bg-surface shadow-pop border border-line flex flex-col max-h-[90vh] overflow-hidden kf-fade-up', width)}>
        <header className="px-5 pt-5 pb-4 border-b border-line flex items-start justify-between gap-3">
          <div>
            <h3 className="kf-section-title">{title}</h3>
            {subtitle && <p className="kf-helper mt-0.5">{subtitle}</p>}
          </div>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <footer className="px-5 py-4 border-t border-line bg-subtle flex items-center justify-end gap-2">{footer}</footer>}
      </div>
    </div>
  );
};

/* ---------- Table helpers ---------- */

export const Table: React.FC<{ headers: React.ReactNode[]; children: React.ReactNode; className?: string }> = ({
  headers,
  children,
  className,
}) => (
  <div className={cn('kf-table-wrap', className)}>
    <table className="kf-table">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export const EmptyState: React.FC<{ icon: string; title: string; description?: string; action?: React.ReactNode }> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-6">
    <div className="w-11 h-11 rounded-xl bg-subtle border border-line flex items-center justify-center text-muted mb-3">
      <Icon name={icon} size={22} />
    </div>
    <p className="font-semibold text-ink">{title}</p>
    {description && <p className="kf-helper mt-1 max-w-sm">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const SkeletonBlock: React.FC<{ h?: number; className?: string }> = ({ h = 14, className }) => (
  <div className={cn('kf-skeleton', className)} style={{ height: h }} />
);

/* ---------- Misc ---------- */

export const LiveDot: React.FC<{ tone?: 'good' | 'warn' | 'bad' }> = ({ tone = 'good' }) => (
  <span className={cn('inline-block w-1.5 h-1.5 rounded-full kf-live-dot', tone === 'good' ? 'bg-good' : tone === 'warn' ? 'bg-warn' : 'bg-bad')} />
);

export const KeyValue: React.FC<{ k: string; v: React.ReactNode; className?: string }> = ({ k, v, className }) => (
  <div className={cn('flex items-baseline justify-between gap-4 py-2 border-b border-line/70 last:border-none', className)}>
    <span className="kf-helper shrink-0">{k}</span>
    <span className="font-semibold text-ink text-right break-words">{v}</span>
  </div>
);

export const Divider: React.FC<{ className?: string }> = ({ className }) => <div className={cn('h-px bg-line my-2', className)} />;