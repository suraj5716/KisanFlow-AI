import React, { useState } from 'react';
import { NavScreenId } from '../types';

interface SidebarProps {
  activeScreen: NavScreenId;
  onSelectScreen: (screen: NavScreenId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onSelectScreen }) => {
  const [logoError, setLogoError] = useState(false);
  const navItems: { id: NavScreenId; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { id: 'demand-intelligence', label: 'Demand Intelligence', icon: 'insights' },
    { id: 'supply-pooling', label: 'Supply Pooling', icon: 'layers' },
    { id: 'buyer-matching-offers', label: 'Buyer Matching & Offers', icon: 'handshake' },
    { id: 'net-realization-engine', label: 'Net Realization Engine', icon: 'calculate' },
    { id: 'logistics-route-optimizer', label: 'Logistics & Routing', icon: 'local_shipping' },
    { id: 'value-chain-what-if-simulator', label: 'What-If Simulator', icon: 'candlestick_chart' },
    { id: 'produce-lots', label: 'Produce Lots', icon: 'qr_code_2' },
    { id: 'ask-kisanflow', label: 'Ask KisanFlow', icon: 'smart_toy' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20">
      <div className="flex flex-col h-full">
        {/* Top Node Branding: Single KisanFlow identity anchor */}
        <div className="h-14 px-3 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/20">
          <div className="flex items-center gap-2 cursor-pointer min-w-0" onClick={() => onSelectScreen('dashboard')}>
            {!logoError ? (
              <img
                alt="KisanFlow AI Logo"
                className="h-8 sm:h-[34px] w-auto max-w-[175px] object-contain flex-shrink-0"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xt-94CEVB5oeoc1iVjox7E4epZpW4Ft6RxaNH8H8WYDX-Qv6klbxiRFqpiWstOVMp8Rg_nJaPF3kgGptlpuBarwpOdwecKF3EMk4XKi7SUSNTJnFaignIeNrRRA8SOPcQ8gCV23RDSfzZAmncEbSatRiYrFgC1qdfmcn3VnvLpZozGiklGw-usRxrHCdZmolLj5btxrGsK6ayqYGJaywxWUTKy5JmNQmbgYiMkWFavsza5k87RhKxacGc"
                onError={() => setLogoError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                </div>
                <div>
                  <span className="text-base text-primary leading-tight block font-bold tracking-tight">
                    KisanFlow
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium tracking-wide uppercase">
                    GovTech Node
                  </span>
                </div>
              </div>
            )}
          </div>
          <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold flex-shrink-0">
            GJ-W01
          </span>
        </div>

        {/* Operational Node Details Card */}
        <div className="px-3 py-2">
          <div className="bg-surface-container-lowest p-2 rounded-md shadow-xs border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-on-surface-variant uppercase font-semibold tracking-wider">
                Operational Node
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            </div>
            <p className="text-[12px] text-on-surface mt-0.5 font-bold truncate">
              Anand Agri Cluster
            </p>
            <p className="text-[10px] text-on-surface-variant">
              Reg: GJ-FPO-4482
            </p>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                type="button"
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                <span className="text-[12.5px] flex-1 truncate">{item.label}</span>
                {item.id === 'supply-pooling' && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-primary text-on-primary' : 'bg-primary-fixed text-on-primary-fixed'
                  }`}>
                    2 Active
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom GovTech Prototype Stamp */}
        <div className="p-2 bg-surface-container-lowest mx-2 mb-2 rounded-md shadow-xs border border-outline-variant/30">
          <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>National Agri-Grid</span>
          </div>
          <p className="text-on-surface-variant mt-0.5 leading-snug text-[10px]">
            Govt of India AgriTech Research &amp; Decision Engine
          </p>
        </div>
      </div>
    </aside>
  );
};
