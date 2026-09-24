import React from 'react';
import { NavScreenId, UserRole } from '../types';
import { cn, Icon } from './ui';

interface SidebarProps {
  activeScreen: NavScreenId;
  onSelectScreen: (screen: NavScreenId) => void;
  currentRole?: UserRole;
}

interface NavGroup {
  label: string;
  items: { id: NavScreenId; label: string; icon: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Primary',
    items: [
      { id: 'dashboard', label: 'Overview', icon: 'space_dashboard' },
      { id: 'market', label: 'Market', icon: 'storefront' },
      { id: 'produce-lots', label: 'Inventory', icon: 'inventory_2' },
      { id: 'buyer-matching-offers', label: 'Orders', icon: 'fact_check' },
      { id: 'logistics-route-optimizer', label: 'Logistics', icon: 'local_shipping' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'demand-intelligence', label: 'Demand Forecast', icon: 'query_stats' },
      { id: 'ai-recommendations', label: 'AI Recommendations', icon: 'auto_awesome' },
      { id: 'net-realization-engine', label: 'Net Realization', icon: 'payments' },
      { id: 'value-chain-what-if-simulator', label: 'What-If Analysis', icon: 'balance' },
    ],
  },
  {
    label: 'Network',
    items: [
      { id: 'buyers', label: 'Buyers', icon: 'groups' },
      { id: 'supply-pooling', label: 'FPO Network', icon: 'hub' },
    ],
  },
  {
    label: 'Analytics',
    items: [{ id: 'analytics', label: 'Analytics', icon: 'monitoring' }],
  },
];

const ROLE_ICON: Record<UserRole, string> = {
  'FPO / Farmer': 'agriculture',
  'Bulk Buyer': 'shopping_cart',
  'Logistics Hub': 'local_shipping',
  Admin: 'admin_panel_settings',
};

export const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onSelectScreen, currentRole = 'FPO / Farmer' }) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 flex w-[232px] flex-col border-r border-line bg-surface">
      {/* Brand */}
      <button
        onClick={() => onSelectScreen('dashboard')}
        className="flex h-14 items-center gap-2.5 px-5 text-left border-b border-line flex-shrink-0 hover:bg-subtle transition-colors"
        type="button"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
          <Icon name="hub" size={18} />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-tight text-ink">
            KisanFlow <span className="text-primary">AI</span>
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-wide text-faint">
            From Demand to Delivery
          </span>
        </span>
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="kf-nav-group-label mb-1.5">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectScreen(item.id)}
                    className={cn('kf-nav-item', active && 'kf-nav-item-active')}
                  >
                    <Icon name={item.icon} size={17} className="shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-line px-3 py-3 space-y-1.5 flex-shrink-0 bg-subtle/60">
        <button
          type="button"
          onClick={() => onSelectScreen('ask-kisanflow')}
          className={cn('kf-nav-item', activeScreen === 'ask-kisanflow' && 'kf-nav-item-active')}
        >
          <Icon name="smart_toy" size={17} className="shrink-0" />
          <span className="flex-1 truncate">Ask KisanFlow</span>
          <span className="h-1.5 w-1.5 rounded-full bg-good kf-live-dot" />
        </button>

        <div className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon name={ROLE_ICON[currentRole]} size={16} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12.5px] font-semibold text-ink">Anand Krishak FPO</p>
            <p className="truncate text-[11px] text-muted">{currentRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};