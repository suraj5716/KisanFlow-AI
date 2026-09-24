export type NavScreenId =
  | 'dashboard'
  | 'demand-intelligence'
  | 'supply-pooling'
  | 'buyer-matching-offers'
  | 'net-realization-engine'
  | 'logistics-route-optimizer'
  | 'value-chain-what-if-simulator'
  | 'produce-lots'
  | 'ask-kisanflow';

export type UserRole = 'FPO / Farmer' | 'Bulk Buyer' | 'Logistics Hub' | 'Admin';

export interface ProduceLot {
  id: string;
  crop: string;
  variety: string;
  grade: 'Grade A' | 'Grade B' | 'Export';
  tonnage: number;
  harvestTime: string;
  harvestHoursAgo: number;
  location: string;
  freshnessRemainingHrs: number;
  qualityRetainedPercent: number;
  temperature: number;
  humidity: number;
  status: 'critical' | 'stable' | 'allocated' | 'dispatched';
  recommendedAction: string;
}

export interface PoolContributor {
  id: string;
  name: string;
  subtext: string;
  allocatedQty: number;
  grade: string;
  hubDistanceKm: number;
  estNetRealizationPerKg: number;
  status: 'Confirmed' | 'Joined' | 'Standby';
  isUserOrg?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'critical' | 'success' | 'info';
  actionable?: boolean;
}
