import React, { useEffect, useRef, useState } from 'react';
import { NavScreenId, UserRole } from '../types';
import { cn, Icon } from './ui';

interface HeaderProps {
  activeScreen?: NavScreenId;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onToggleNotifications: () => void;
  unreadCount: number;
  onNavigate: (screen: NavScreenId) => void;
}

const SCREEN_TITLES: Record<NavScreenId, string> = {
  dashboard: 'Overview',
  market: 'Market',
  'produce-lots': 'Inventory',
  'buyer-matching-offers': 'Orders',
  'logistics-route-optimizer': 'Logistics',
  'demand-intelligence': 'Demand Forecast',
  'ai-recommendations': 'AI Recommendations',
  'net-realization-engine': 'Net Realization',
  'value-chain-what-if-simulator': 'What-If Analysis',
  buyers: 'Buyers',
  'supply-pooling': 'FPO Network',
  analytics: 'Analytics',
  'ask-kisanflow': 'Ask KisanFlow',
};

const ROLES: { role: UserRole; icon: string }[] = [
  { role: 'FPO / Farmer', icon: 'agriculture' },
  { role: 'Bulk Buyer', icon: 'shopping_cart' },
  { role: 'Logistics Hub', icon: 'local_shipping' },
  { role: 'Admin', icon: 'admin_panel_settings' },
];

interface QuickAction {
  id: NavScreenId | string;
  label: string;
  hint: string;
  icon: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'dashboard', label: 'Overview', hint: 'Today in your supply chain', icon: 'space_dashboard' },
  { id: 'market', label: 'Market', hint: 'Where your produce sells best', icon: 'storefront' },
  { id: 'produce-lots', label: 'Inventory', hint: 'Lots, freshness and quality', icon: 'inventory_2' },
  { id: 'buyer-matching-offers', label: 'Orders', hint: 'Buyer requirements and contracts', icon: 'fact_check' },
  { id: 'logistics-route-optimizer', label: 'Logistics', hint: 'Active shipments and routes', icon: 'local_shipping' },
  { id: 'demand-intelligence', label: 'Demand Forecast', hint: 'Historical demand and forecast', icon: 'query_stats' },
  { id: 'ai-recommendations', label: 'AI Recommendations', hint: 'What to act on next', icon: 'auto_awesome' },
  { id: 'net-realization-engine', label: 'Net Realization', hint: 'What you actually earn', icon: 'payments' },
  { id: 'value-chain-what-if-simulator', label: 'What-If Analysis', hint: 'Stress-test scenarios', icon: 'balance' },
  { id: 'buyers', label: 'Buyers', hint: 'Buyer network and reliability', icon: 'groups' },
  { id: 'supply-pooling', label: 'FPO Network', hint: 'Pool supply across FPOs', icon: 'hub' },
  { id: 'analytics', label: 'Analytics', hint: 'Trends over time', icon: 'monitoring' },
  { id: 'ask-kisanflow', label: 'Ask KisanFlow', hint: 'Ask questions to AI', icon: 'smart_toy' },
];

const isNavId = (id: string): id is NavScreenId => id !== 'create-lot';

export const Header: React.FC<HeaderProps> = ({
  activeScreen = 'dashboard',
  currentRole,
  onSelectRole,
  onToggleNotifications,
  unreadCount,
  onNavigate,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [paletteOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const filtered = QUICK_ACTIONS.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.hint.toLowerCase().includes(query.toLowerCase()),
  );

  const go = (id: string) => {
    if (isNavId(id)) onNavigate(id);
    setPaletteOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[index]) {
      go(filtered[index].id);
    }
  };

  return (
    <header className="fixed top-0 left-[232px] right-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-line bg-surface/90 px-5 backdrop-blur">
      {/* Left: title */}
      <div className="flex min-w-0 items-center gap-2">
        <p className="truncate text-[14.5px] font-semibold text-ink">{SCREEN_TITLES[activeScreen] || 'Overview'}</p>
      </div>

      {/* Right: search, notifications, profile */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-ink transition-colors"
          title="Search or jump to a page (Ctrl+K)"
          type="button"
        >
          <Icon name="search" size={17} />
        </button>

        <button
          onClick={onToggleNotifications}
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-ink transition-colors"
          title="Notifications"
          type="button"
        >
          <Icon name="notifications_none" size={18} />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-bad px-0.5 text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-1.5 hover:bg-subtle transition-colors"
            type="button"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon name="person" size={14} />
            </span>
            <span className="hidden text-[12px] font-medium text-ink md:block">{currentRole}</span>
            <Icon name="expand_more" size={14} className="text-faint" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-10 w-56 rounded-lg border border-line bg-surface p-1.5 shadow-pop kf-fade-up">
              <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                Portal view
              </p>
              {ROLES.map(({ role, icon }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    onSelectRole(role);
                    setProfileOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-muted hover:bg-subtle hover:text-ink transition-colors',
                    currentRole === role && 'bg-primary-soft text-primary-strong',
                  )}
                >
                  <Icon name={icon} size={16} />
                  <span>{role}</span>
                  {currentRole === role && <Icon name="check" size={14} className="ml-auto text-primary" />}
                </button>
              ))}
              <div className="mt-1.5 border-t border-line pt-1.5">
                <div className="flex items-center justify-between px-2.5 py-1.5">
                  <span className="text-[12px] text-muted">Anand Krishak FPO</span>
                  <span className="text-[11px] font-medium text-faint">GJ-FPO-4482</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Command palette */}
      {paletteOpen && (
        <div className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={() => setPaletteOpen(false)} />
          <div className="absolute left-1/2 top-[15%] w-[520px] max-w-[92vw] -translate-x-1/2 rounded-xl border border-line bg-surface shadow-pop kf-fade-up">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <Icon name="search" size={18} className="text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Jump to a page…"
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
              />
              <kbd className="rounded border border-line bg-subtle px-1.5 py-0.5 text-[10px] font-medium text-faint">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-[13px] text-muted">No pages match “{query}”.</p>
              )}
              {filtered.map((action, i) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => go(action.id)}
                  onMouseEnter={() => setIndex(i)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
                    i === index ? 'bg-primary-soft' : '',
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-muted">
                    <Icon name={action.icon} size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-ink">{action.label}</span>
                    <span className="block truncate text-[11.5px] text-muted">{action.hint}</span>
                  </span>
                  {i === index && <Icon name="arrow_forward" size={14} className="ml-auto text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};