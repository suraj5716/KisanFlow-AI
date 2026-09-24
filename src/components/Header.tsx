import React from 'react';
import { UserRole, NavScreenId } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onRunHackathonDemo?: () => void;
  onToggleNotifications: () => void;
  unreadCount: number;
  activeScreen?: NavScreenId;
}

const SCREEN_TITLES: Record<NavScreenId, string> = {
  'dashboard': 'Dashboard',
  'demand-intelligence': 'Demand Intelligence',
  'supply-pooling': 'Supply Pooling',
  'buyer-matching-offers': 'Buyer Matching & Offers',
  'net-realization-engine': 'Net Realization Engine',
  'logistics-route-optimizer': 'Logistics & Routing',
  'value-chain-what-if-simulator': 'What-If Simulator',
  'produce-lots': 'Produce Lots',
  'ask-kisanflow': 'Ask KisanFlow AI',
};

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  onRunHackathonDemo: _onRunHackathonDemo,
  onToggleNotifications,
  unreadCount,
  activeScreen = 'dashboard',
}) => {
  const roles: UserRole[] = ['FPO / Farmer', 'Bulk Buyer', 'Logistics Hub', 'Admin'];

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 border-b border-outline-variant/20">
      <div className="w-full h-full px-4 flex items-center justify-between gap-3">
        {/* Left Zone: Console Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <span className="text-on-surface-variant/60 font-medium">Console</span>
            <span className="text-outline-variant/60">/</span>
            <span className="text-on-surface font-semibold text-sm">
              {SCREEN_TITLES[activeScreen] || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Right Zone: Role Switcher, Notifications & Profile */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Persona / Role Selector */}
          <div className="hidden xl:flex items-center p-0.5 bg-surface-container rounded-md gap-0.5 border border-outline-variant/20">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => onSelectRole(role)}
                type="button"
                className={`px-2.5 py-1 rounded font-label-md transition-colors text-[11px] font-semibold ${
                  currentRole === role
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onToggleNotifications}
            className="relative p-1.5 rounded-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            type="button"
            title="Active Freshness & Telemetry Alerts"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-error text-on-error font-label-md text-[9px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Lockup */}
          <div className="flex items-center gap-2 pl-1 border-l border-outline-variant/20">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-on-primary text-[15px]">person</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-title-sm text-on-surface leading-tight font-bold text-[12px]">
                Anand Krishak FPO
              </p>
              <p className="font-body-sm text-on-surface-variant leading-none text-[10px] mt-0.5">
                GJ-FPO-4482
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
