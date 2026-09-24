export interface MarketOpportunity {
  id: string;
  crop: string;
  region: string;
  demand: number;
  supply: number;
  gap: number;
  priceRange: string;
  opportunity: string;
  confidence: number;
  deliverySla: string;
  action: string;
  stage: string;
}

export interface BuyerRequirement {
  id: string;
  buyer: string;
  buyerShort: string;
  crop: string;
  requiredQuantity: number;
  quality: string;
  location: string;
  offerPerKg: number;
  deadline: string;
  match: number;
  escrow: string;
  paymentTerms: string;
  reliability: number;
  netRealization: number;
  status: 'open' | 'counter';
}

export interface BuyerProfile {
  id: string;
  name: string;
  segment: string;
  location: string;
  typicalVolume: string;
  paymentReliability: number;
  escrow: string;
  openOpportunities: number;
  lastSettlement: string;
  contacts: string;
}

export interface Recommendation {
  id: string;
  tag: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral' | 'primary';
  title: string;
  why: string;
  action: string;
  navigate?: string;
  confidence?: number;
}

export interface Shipment {
  id: string;
  vehicle: string;
  type: string;
  driver: string;
  origin: string;
  destination: string;
  crop: string;
  quantity: number;
  eta: string;
  status: string;
  tone: 'good' | 'neutral' | 'warn';
  freshnessWindow: string;
  capacity: string;
  leg: number;
  speed: string;
  temp: string;
  progress: number;
}

export const marketOpportunities: MarketOpportunity[] = [
  {
    id: 'NODE-AHM-01',
    crop: 'Tomato · Grade A',
    region: 'Ahmedabad Urban Metro',
    demand: 72,
    supply: 18,
    gap: 115,
    priceRange: '₹31 – ₹36 /kg',
    opportunity: 'High',
    confidence: 91,
    deliverySla: '6 hours',
    action: 'Trigger dispatch from Anand & Kheda cooperative clusters (< 150 km radial).',
    stage: 'High-priority deficit',
  },
  {
    id: 'NODE-SUR-04',
    crop: 'Tomato · Grade B',
    region: 'Surat Food Processing Belt',
    demand: 56,
    supply: 22,
    gap: 80,
    priceRange: '₹24 – ₹27 /kg',
    opportunity: 'Medium',
    confidence: 88,
    deliverySla: '24 hours',
    action: 'Divert ripe lots and second-picking harvests to Hazira industrial canning units.',
    stage: 'Contract processing',
  },
  {
    id: 'NODE-BDQ-02',
    crop: 'Capsicum · Polyhouse',
    region: 'Vadodara Quick-Commerce',
    demand: 34,
    supply: 25,
    gap: 22,
    priceRange: '₹42 – ₹48 /kg',
    opportunity: 'High',
    confidence: 94,
    deliverySla: '5 hours',
    action: 'Mobilize Padra FPO protected greenhouse harvests for dark-store direct fulfillment.',
    stage: 'Premium greenhouse',
  },
  {
    id: 'NODE-RJT-03',
    crop: 'Potato · Kufri Pukhraj',
    region: 'Rajkot Central Terminal',
    demand: 48,
    supply: 40,
    gap: 12,
    priceRange: '₹17 – ₹21 /kg',
    opportunity: 'Low',
    confidence: 84,
    deliverySla: '12 hours',
    action: 'Staggered cold-link release of stable lots to match steady off-take.',
    stage: 'Stable off-take',
  },
];

export const buyerRequirements: BuyerRequirement[] = [
  {
    id: 'BID-BB-902',
    buyer: 'BigBasket Gujarat Central DC',
    buyerShort: 'BB',
    crop: 'Tomato (Himsona Grade A)',
    requiredQuantity: 20.0,
    quality: 'Grade A',
    location: 'Sanand Industrial Hub, Ahmedabad',
    offerPerKg: 32.5,
    deadline: '18h 42m',
    match: 99.4,
    escrow: 'Bank escrow · Instant T+1',
    paymentTerms: 'Settlement in 24h',
    reliability: 98,
    netRealization: 30.2,
    status: 'open',
  },
  {
    id: 'BID-REL-412',
    buyer: 'Reliance Retail Fresh Terminal',
    buyerShort: 'RE',
    crop: 'Tomato (Grade A & B Mixed)',
    requiredQuantity: 15.0,
    quality: 'Grade A/B',
    location: 'Naroda Logistics Park, Ahmedabad',
    offerPerKg: 31.0,
    deadline: '1d 6h',
    match: 96.2,
    escrow: 'e-NAM digital mandate',
    paymentTerms: 'Settlement in 48h',
    reliability: 95,
    netRealization: 28.9,
    status: 'open',
  },
  {
    id: 'BID-SUR-108',
    buyer: 'Hazira Food Processing Industries',
    buyerShort: 'HZ',
    crop: 'Tomato (Grade B Canning)',
    requiredQuantity: 80.0,
    quality: 'Grade B',
    location: 'Hazira Industrial Zone, Surat',
    offerPerKg: 26.5,
    deadline: '3d 4h',
    match: 91.8,
    escrow: 'State processing subsidy escrow',
    paymentTerms: 'T+2 with inspection',
    reliability: 92,
    netRealization: 25.2,
    status: 'counter',
  },
];

export const buyerProfiles: BuyerProfile[] = [
  {
    id: 'BC-FB-01',
    name: 'FreshBasket Retail Ltd',
    segment: 'Modern retail chain',
    location: 'Ahmedabad · 42 stores',
    typicalVolume: '5–15 MT / week',
    paymentReliability: 98,
    escrow: 'Tier-1 institutional escrow',
    openOpportunities: 3,
    lastSettlement: 'T+1 · 100%',
    contacts: 'Procurement desk (Pune) + 3 category buyers',
  },
  {
    id: 'BC-BB-02',
    name: 'BigBasket Gujarat Central DC',
    segment: 'Online grocers / quick-commerce',
    location: 'Sanand Industrial Hub',
    typicalVolume: '20 MT / order',
    paymentReliability: 99,
    escrow: 'Bank escrow · Instant T+1',
    openOpportunities: 1,
    lastSettlement: 'T+0 · 100%',
    contacts: 'Sanand DC inbound + Nodal ERP',
  },
  {
    id: 'BC-HZ-03',
    name: 'Hazira Food Processing Industries',
    segment: 'Industrial processor',
    location: 'Hazira Industrial Zone, Surat',
    typicalVolume: '50–80 MT / month',
    paymentReliability: 92,
    escrow: 'State processing subsidy escrow',
    openOpportunities: 2,
    lastSettlement: 'T+2 · 96%',
    contacts: 'Raw-material desk + Quality dept',
  },
  {
    id: 'BC-RR-04',
    name: 'Reliance Retail Fresh Terminal',
    segment: 'Modern retail chain',
    location: 'Naroda Logistics Park, Ahmedabad',
    typicalVolume: '10–15 MT / week',
    paymentReliability: 95,
    escrow: 'e-NAM digital mandate',
    openOpportunities: 0,
    lastSettlement: 'T+2 · 99%',
    contacts: 'Naroda category manager',
  },
];

export const recommendations: Recommendation[] = [
  {
    id: 'REC-01',
    tag: 'Demand opportunity',
    tone: 'good',
    title: 'Tomato demand in Ahmedabad forecast to surge +18%',
    why: 'Regional deficit of 65 MT over the next 7 days vs. 18 MT committed supply from the Anand cluster.',
    action: 'Lock 5.0 MT into Virtual Pool #VPL-AHM-902 with FreshBasket at ₹30.20/kg net.',
    navigate: 'supply-pooling',
    confidence: 93,
  },
  {
    id: 'REC-02',
    tag: 'Freshness risk',
    tone: 'bad',
    title: 'Lot TOM-0042 entering critical freshness window',
    why: 'Only 30 hours of shelf-life remain at 8.2°C; quality is holding at 58% and falling.',
    action: 'Dispatch immediately to Ahmedabad via expedited reefer lane, or shift to shaded Priority Bay 1.',
    navigate: 'logistics-route-optimizer',
    confidence: 98,
  },
  {
    id: 'REC-03',
    tag: 'Logistics',
    tone: 'warn',
    title: 'Reverse haul available on GJ-23-AX-8912',
    why: 'Refrigerated E-Truck returns empty from Ahmedabad at 14:15 with 40 crates of spare capacity.',
    action: 'Reserve the backhaul slot to save ₹400 per trip and avoid empty-mile freight.',
    navigate: 'logistics-route-optimizer',
    confidence: 96,
  },
  {
    id: 'REC-04',
    tag: 'Net realization',
    tone: 'good',
    title: 'Virtual pooling unlocks ₹10.85/kg over APMC mandi',
    why: 'Direct bulk contracting raises gross offer while shared reefer freight trims logistics cost.',
    action: 'Exploit the channel; your 8.4 MT qualifies for the 22.0 MT pooled tender.',
    navigate: 'net-realization-engine',
    confidence: 91,
  },
  {
    id: 'REC-05',
    tag: 'Supply pooling',
    tone: 'good',
    title: 'Pooled tender threshold reached at 75%',
    why: 'Kheda (5T) and Charotar (5T) have joined #VPL-TOM-2026-881 toward the 20 MT target.',
    action: 'Add Borsad reserve cluster (4T) to exceed the target and strengthen the contract position.',
    navigate: 'supply-pooling',
    confidence: 94,
  },
];

export const shipments: Shipment[] = [
  {
    id: 'GJ-23-AX-8912',
    vehicle: 'Tata Ultra Electric Reefer 25T',
    type: 'E-Reefer',
    driver: 'Ramesh Patel',
    origin: 'Anand Hub',
    destination: 'BigBasket DC, Sanand',
    crop: 'Tomato · 20 MT',
    quantity: 20,
    eta: '10:45 AM',
    status: 'In transit · on time',
    tone: 'good',
    freshnessWindow: '18h remaining',
    capacity: 'Packaging 92%',
    leg: 2,
    speed: '58 km/h',
    temp: '8.2°C',
    progress: 64,
  },
  {
    id: 'GJ-07-BB-4421',
    vehicle: 'Eicher Pro 3019 Cold Liner',
    type: 'Cold liner',
    driver: 'Kiran Desai',
    origin: 'Charotar Collection Bay',
    destination: 'Sanand DC',
    crop: 'Capsicum · 2.4 MT',
    quantity: 2.4,
    eta: '11:15 AM',
    status: 'Loading waypoint 2',
    tone: 'neutral',
    freshnessWindow: '22h remaining',
    capacity: 'Loading 64%',
    leg: 2,
    speed: '44 km/h',
    temp: '7.8°C',
    progress: 38,
  },
  {
    id: 'GJ-01-XX-1122',
    vehicle: 'Ashok Leyland Reefer',
    type: 'Reefer',
    driver: 'Suresh Yadav',
    origin: 'Kheda Dock',
    destination: 'Ahmedabad Hub',
    crop: 'Potato · 6 MT',
    quantity: 6,
    eta: '12:30 PM',
    status: 'Temperature alert',
    tone: 'warn',
    freshnessWindow: 'Stable',
    capacity: 'Loaded 100%',
    leg: 1,
    speed: '49 km/h',
    temp: '12.0°C',
    progress: 52,
  },
];

export const analyticsSeries = {
  gmv: [
    { name: 'Mon', gmv: 8.2 },
    { name: 'Tue', gmv: 9.1 },
    { name: 'Wed', gmv: 11.4 },
    { name: 'Thu', gmv: 10.8 },
    { name: 'Fri', gmv: 12.5 },
    { name: 'Sat', gmv: 13.9 },
    { name: 'Sun', gmv: 14.2 },
  ],
  volume: [
    { day: 'Day 1', volume: 14.5, rate: 30.5 },
    { day: 'Day 2', volume: 16.2, rate: 31.0 },
    { day: 'Day 3', volume: 12.8, rate: 29.8 },
    { day: 'Day 4', volume: 18.9, rate: 32.1 },
    { day: 'Day 5', volume: 22.0, rate: 30.2 },
  ],
  escrow: [
    { name: 'Anand FPO', success: 98, pending: 2 },
    { name: 'Kheda FPO', success: 100, pending: 0 },
    { name: 'Surat FPO', success: 95, pending: 5 },
    { name: 'Rajkot FPO', success: 85, pending: 15 },
  ],
  shipments: [
    { name: 'Mon', count: 6 },
    { name: 'Tue', count: 8 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 9 },
    { name: 'Fri', count: 7 },
    { name: 'Sat', count: 11 },
    { name: 'Sun', count: 10 },
  ],
};