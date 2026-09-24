import React, { useState } from 'react';
import { NavScreenId, UserRole, ProduceLot, NotificationItem } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { Sih12StepModal } from './components/modals/Sih12StepModal';
import { CreateLotModal } from './components/modals/CreateLotModal';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { BuyerDashboard } from './components/screens/BuyerDashboard';
import { LogisticsDashboard } from './components/screens/LogisticsDashboard';
import { AdminDashboard } from './components/screens/AdminDashboard';
import { MarketScreen } from './components/screens/MarketScreen';
import { DemandIntelligenceScreen } from './components/screens/DemandIntelligenceScreen';
import { AIRecommendationsScreen } from './components/screens/AIRecommendationsScreen';
import { SupplyPoolingScreen } from './components/screens/SupplyPoolingScreen';
import { BuyerMatchingScreen } from './components/screens/BuyerMatchingScreen';
import { BuyersScreen } from './components/screens/BuyersScreen';
import { NetRealizationScreen } from './components/screens/NetRealizationScreen';
import { LogisticsScreen } from './components/screens/LogisticsScreen';
import { WhatIfSimulatorScreen } from './components/screens/WhatIfSimulatorScreen';
import { ProduceLotsScreen } from './components/screens/ProduceLotsScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { AskKisanFlowScreen } from './components/screens/AskKisanFlowScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<NavScreenId>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('FPO / Farmer');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isSihModalOpen, setIsSihModalOpen] = useState(false);
  const [isCreateLotModalOpen, setIsCreateLotModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);

  // Data
  const [lots, setLots] = useState<ProduceLot[]>([
    {
      id: 'LOT-TOM-2026-0042',
      crop: 'Tomato',
      variety: 'Tomato (Himsona Grade A)',
      grade: 'Grade A',
      tonnage: 8.4,
      harvestTime: '2026-09-24T02:00',
      harvestHoursAgo: 18,
      location: 'Anand Hub Center',
      freshnessRemainingHrs: 30,
      qualityRetainedPercent: 58,
      temperature: 8.2,
      humidity: 88,
      status: 'critical',
      recommendedAction: 'AI Action: Immediate Ahmedabad Dispatch',
    },
    {
      id: 'LOT-POT-2026-0019',
      crop: 'Potato',
      variety: 'Potato (Kufri Pukhraj)',
      grade: 'Grade A',
      tonnage: 14.0,
      harvestTime: '2026-09-20T08:00',
      harvestHoursAgo: 96,
      location: 'Deesa Cold Link CA-04',
      freshnessRemainingHrs: 432,
      qualityRetainedPercent: 94,
      temperature: 4.0,
      humidity: 92,
      status: 'stable',
      recommendedAction: 'Status: Ambient Hold • Staggered Release',
    },
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Anand Staging Area Ambient Spike',
      description: 'Zone B temp jumped to 31.2°C. Recommended action: Shift Lot TOM-0042 to shaded bay or load immediately.',
      timeAgo: '8m ago',
      type: 'critical',
      actionable: true,
    },
    {
      id: 'notif-2',
      title: 'Kheda FPO C Accepted Mutual Pool',
      description: '4.0 Tonnes locked into #VPL-AHM-902. Virtual Pool threshold reached 75%.',
      timeAgo: '22m ago',
      type: 'success',
    },
    {
      id: 'notif-3',
      title: 'Reverse Logistics E-Truck Detected',
      description: 'Refrigerated E-Truck GJ-23-AX-8912 returning empty from Ahmedabad with 40 crates capacity. Passing Anand toll at 14:15.',
      timeAgo: '35m ago',
      type: 'info',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleAddLot = (newLot: ProduceLot) => {
    setLots((prev) => [newLot, ...prev]);
    showToast(`Digital Lot ${newLot.id} minted! Assigned to ${newLot.location}.`);
  };

  const handleRunHackathonDemo = () => {
    setIsSihModalOpen(true);
    showToast('Executing 12-Step Autonomous Agri Flow simulation...');
  };

  const handleActionNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setIsNotificationsDrawerOpen(false);
    showToast('Telemetry alert acknowledged. Cooling bay re-routed to Priority Bay 1.');
  };

  return (
    <div className="min-h-screen bg-page font-sans text-ink antialiased">
      {/* Sidebar Navigation */}
      <Sidebar activeScreen={activeScreen} onSelectScreen={setActiveScreen} currentRole={currentRole} />

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-col pl-[232px]">
        {/* Top Header */}
        <Header
          activeScreen={activeScreen}
          currentRole={currentRole}
          onSelectRole={(role) => {
            setCurrentRole(role);
            showToast(`Switched active portal view to: ${role}`);
          }}
          onToggleNotifications={() => setIsNotificationsDrawerOpen((prev) => !prev)}
          unreadCount={notifications.length}
          onNavigate={setActiveScreen}
        />

        {/* Viewport Content */}
        <main className="relative min-h-screen w-full bg-page px-6 pb-14 pt-14">
          <div className="mx-auto w-full max-w-[1320px]">
            {activeScreen === 'dashboard' && currentRole === 'FPO / Farmer' && (
              <DashboardScreen
                onNavigate={setActiveScreen}
                onOpenSihModal={() => setIsSihModalOpen(true)}
                onOpenCreateLotModal={() => setIsCreateLotModalOpen(true)}
                onShowToast={showToast}
                lots={lots}
              />
            )}

            {activeScreen === 'dashboard' && currentRole === 'Bulk Buyer' && (
              <BuyerDashboard onNavigate={setActiveScreen} onShowToast={showToast} />
            )}

            {activeScreen === 'dashboard' && currentRole === 'Logistics Hub' && (
              <LogisticsDashboard onNavigate={setActiveScreen} onShowToast={showToast} />
            )}

            {activeScreen === 'dashboard' && currentRole === 'Admin' && (
              <AdminDashboard onNavigate={setActiveScreen} onShowToast={showToast} />
            )}

            {activeScreen === 'market' && <MarketScreen onNavigate={setActiveScreen} onShowToast={showToast} />}

            {activeScreen === 'demand-intelligence' && (
              <DemandIntelligenceScreen onNavigate={setActiveScreen} onShowToast={showToast} />
            )}

            {activeScreen === 'ai-recommendations' && (
              <AIRecommendationsScreen onNavigate={setActiveScreen} onShowToast={showToast} />
            )}

            {activeScreen === 'supply-pooling' && <SupplyPoolingScreen onShowToast={showToast} />}

            {activeScreen === 'buyer-matching-offers' && <BuyerMatchingScreen onShowToast={showToast} />}

            {activeScreen === 'buyers' && <BuyersScreen onNavigate={setActiveScreen} onShowToast={showToast} />}

            {activeScreen === 'net-realization-engine' && <NetRealizationScreen onShowToast={showToast} />}

            {activeScreen === 'logistics-route-optimizer' && <LogisticsScreen onShowToast={showToast} />}

            {activeScreen === 'value-chain-what-if-simulator' && <WhatIfSimulatorScreen onShowToast={showToast} />}

            {activeScreen === 'produce-lots' && (
              <ProduceLotsScreen
                lots={lots}
                onOpenCreateLotModal={() => setIsCreateLotModalOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeScreen === 'analytics' && <AnalyticsScreen onShowToast={showToast} />}

            {activeScreen === 'ask-kisanflow' && <AskKisanFlowScreen />}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
        notifications={notifications}
        onActionNotification={handleActionNotification}
      />

      {/* 12-Step Guided Modal */}
      <Sih12StepModal
        isOpen={isSihModalOpen}
        onClose={() => setIsSihModalOpen(false)}
        onFinishedFlow={() => showToast('12-Step Autonomous Agri Flow completed with 100% verification score!')}
      />

      {/* Create Digital Lot Modal */}
      <CreateLotModal
        isOpen={isCreateLotModalOpen}
        onClose={() => setIsCreateLotModalOpen(false)}
        onAddLot={handleAddLot}
      />
    </div>
  );
}