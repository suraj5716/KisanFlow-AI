# KisanFlow AI 🌾

> **From Demand to Harvest to Delivery.**

KisanFlow AI is an AI-powered farm-to-market intelligence platform
designed for **SIH26033**. It connects Farmers/FPOs, bulk buyers,
consumers, and logistics providers while using AI and optimization
techniques to improve agricultural supply-chain decisions.

## 🚀 Problem

Agricultural supply chains often involve multiple intermediaries,
limited demand visibility, inefficient logistics, and produce wastage.
Farmers and FPOs may also struggle to find suitable buyers for specific
quantities, qualities, and delivery windows.

KisanFlow AI addresses these challenges through an intelligent digital
marketplace and supply-chain orchestration layer.

## 💡 Solution

KisanFlow AI helps answer:

-   **What should we sell?** --- AI demand forecasting
-   **Where should we sell?** --- Regional market intelligence
-   **When should we sell?** --- Demand and price trend analysis
-   **Which buyer should we choose?** --- AI buyer matching
-   **What will we actually earn?** --- Net-realization analysis
-   **How should we deliver it?** --- Route and logistics optimization

### Core Flow

``` text
Farmers / FPOs
       ↓
Digital Inventory & Lots
       ↓
AI Demand Forecasting
       ↓
Multi-FPO Supply Pooling
       ↓
AI Buyer Matching
       ↓
Net Realization Analysis
       ↓
Freshness-Aware Logistics
       ↓
Route Optimization
       ↓
Buyer / Consumer
       ↓
Delivery & Payment
       ↓
Analytics & Feedback
```

## ✨ Key Features

### 📊 AI Demand Forecasting

Forecast crop demand by region and time period using historical data,
seasonality, market trends, and other signals.

### 🔗 Multi-FPO Supply Pooling

Combine supply from multiple FPOs into a virtual supply lot to fulfill
larger buyer requirements.

### 🎯 Smart Buyer Matching

Match produce with buyers using quantity, location, quality, price,
delivery requirements, logistics cost, and payment reliability.

### 💰 Net Realization Engine

Compare buyers based on estimated farmer/FPO realization after
logistics, packaging, handling, and expected losses.

``` text
Net Realization =
Selling Price
- Logistics Cost
- Packaging Cost
- Handling Cost
- Expected Loss
```

### 🧠 AI Recommendations

Recommend where to sell, when to sell, which buyer to select, and how
much inventory to allocate.

### 🚚 Route Optimization

Optimize pickup and delivery routes based on distance, travel time,
vehicle capacity, multiple stops, and delivery deadlines.

### 🥬 Freshness-Aware Logistics

Consider crop perishability, harvest time, remaining shelf life, route
duration, and expected quality loss.

### 🔄 Reverse Logistics

Use return-trip vehicle capacity for agricultural inputs, packaging,
crates, or other suitable cargo instead of returning empty.

### 📈 What-If Simulator

Compare different buyers, prices, routes, quantities, delays, and
supply-pooling scenarios before making a transaction.

### 🗺️ Market Intelligence

Visualize supply clusters, demand hotspots, FPO locations, buyer
locations, price trends, and logistics routes.

## 👥 Users

### Farmers & FPOs

-   Manage inventory
-   Create digital produce lots
-   Find buyers
-   View demand forecasts
-   Compare expected net realization
-   Track orders and payments

### Bulk Buyers

-   Post procurement requirements
-   Find suitable FPO suppliers
-   Compare offers
-   Purchase in bulk
-   Track shipments

### Logistics Providers

-   Manage vehicles
-   Receive optimized routes
-   Manage multiple pickups
-   Track deliveries
-   Utilize return-trip capacity

### Consumers

-   Browse agricultural products
-   View origin and quality information
-   Purchase products
-   Track deliveries

### Government / Administrators

-   Monitor supply and demand
-   Analyze FPO activity
-   Identify regional shortages
-   View agricultural market intelligence

## 🏗️ System Architecture

``` text
                     KISANFLOW AI
                          │
         ┌────────────────┼────────────────┐
         │                │                │
      Farmers          Buyers          Logistics
         │                │                │
         └────────────────┼────────────────┘
                          ↓
                   Data Collection
                          ↓
                   Data Processing
                          ↓
                ┌──────────────────┐
                │     AI / ML      │
                ├──────────────────┤
                │ Demand Forecast   │
                │ Buyer Matching    │
                │ Recommendations   │
                │ Risk Analysis     │
                └────────┬─────────┘
                         ↓
                Optimization Engine
                  │               │
                  ↓               ↓
             Supply Pooling   Route Planning
                  │               │
                  └───────┬───────┘
                          ↓
                     Marketplace
                          ↓
                   Orders & Delivery
                          ↓
                       Analytics
```

## 🛠️ Technology Stack

  Layer            Technology
  ---------------- ----------------------------------------------
  Frontend         React.js, Vite, Tailwind CSS
  Backend          Python, FastAPI
  Database         PostgreSQL, PostGIS
  AI/ML            Python, Pandas, NumPy, Scikit-learn, XGBoost
  Optimization     Google OR-Tools
  Maps             Leaflet, OpenStreetMap / Mapbox
  Authentication   JWT, RBAC
  Charts           Recharts
  Deployment       Docker, AWS, Vercel, Render

## 🤖 AI / ML Modules

The application is designed with modular AI services:

1.  **DemandForecastService** --- predicts regional crop demand.
2.  **BuyerMatchingService** --- identifies suitable buyers.
3.  **NetRealizationService** --- estimates expected earnings after
    costs.
4.  **SupplyPoolingService** --- creates optimized multi-FPO supply
    lots.
5.  **NegotiationAssistant** --- supports offer analysis and
    counter-offers.
6.  **FreshnessRiskService** --- estimates perishability and delivery
    risk.
7.  **RouteOptimizationService** --- optimizes pickup and delivery
    routes.
8.  **RecommendationService** --- combines signals into actionable
    recommendations.
9.  **SupplyRiskService** --- identifies shortages, surpluses, and
    delivery risks.
10. **ReverseLogisticsService** --- identifies useful return-trip
    opportunities.

For the hackathon prototype, simulated/seeded data may be used where
live APIs or production datasets are unavailable. Such data should be
clearly labelled as demo data.

## 📂 Project Structure

``` text
kisanflow-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── ml/
│   │   └── main.py
│   └── requirements.txt
│
├── ml/
│   ├── demand_forecasting/
│   ├── buyer_matching/
│   ├── route_optimization/
│   └── recommendation/
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── docs/
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

-   Node.js 18+
-   Python 3.10+
-   PostgreSQL 14+
-   Git
-   Docker (optional)

### Clone the repository

``` bash
git clone https://github.com/<your-username>/kisanflow-ai.git
cd kisanflow-ai
```

### Configure environment variables

``` bash
cp .env.example .env
```

Example:

``` env
DATABASE_URL=postgresql://username:password@localhost:5432/kisanflow
JWT_SECRET=your-secret-key
MAP_API_KEY=your-map-api-key
WEATHER_API_KEY=your-weather-api-key
```

Never commit real API keys or secrets.

### Backend

``` bash
cd backend

python -m venv venv
```

Windows:

``` bash
venv\Scripts\activate
```

Linux/macOS:

``` bash
source venv/bin/activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Run the API:

``` bash
uvicorn app.main:app --reload
```

API:

``` text
http://localhost:8000
```

Swagger documentation:

``` text
http://localhost:8000/docs
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

## 🧪 Hackathon Demo

The recommended demonstration scenario is:

1.  An FPO has 8 tonnes of Grade-A tomatoes.
2.  AI detects high predicted demand in a target region.
3.  The system identifies additional nearby FPO supply.
4.  A virtual supply lot is created.
5.  Suitable buyers are identified.
6.  Offers are compared using net realization.
7.  AI recommends an economically suitable buyer.
8.  The logistics engine generates an optimized route.
9.  Freshness risk is evaluated.
10. Return-trip logistics are checked.
11. The transaction and delivery are tracked.
12. The system displays the resulting supply-chain metrics.

All demonstration values should be clearly identified as simulated or
estimated unless backed by real deployment data.

## 📊 Key Metrics

The dashboard can monitor:

-   Expected FPO net realization
-   Demand forecast
-   Supply-demand gap
-   Logistics cost
-   Delivery time
-   Vehicle utilization
-   Expected freshness/spoilage risk
-   Buyer reliability
-   Order fulfillment
-   Supply-pooling efficiency

## 🔐 Security

The platform is designed to support:

-   JWT authentication
-   Role-based access control
-   Password hashing
-   Input validation
-   API authorization
-   Secure environment variables
-   Basic audit logging

## 🔮 Future Scope

-   Live agricultural market-data integration
-   Real-time weather integration
-   Satellite-based crop monitoring
-   IoT-based cold-chain monitoring
-   AI-based quality inspection
-   Multilingual voice assistant
-   Dedicated farmer mobile application
-   Advanced price forecasting
-   Large-scale regional supply optimization
-   Integration with existing agricultural commerce networks

## 🎯 Smart India Hackathon

**Problem Statement:** SIH26033

**Domain:** Agriculture, FoodTech & Rural Development

**Solution:** KisanFlow AI

### Core Innovation

> KisanFlow AI goes beyond a conventional agricultural marketplace by
> acting as an intelligent supply-chain orchestration layer that
> connects demand forecasting, FPO supply pooling, buyer matching,
> net-realization analysis, freshness-aware logistics, route
> optimization, and reverse logistics.

## 📜 License

This project is developed as a Smart India Hackathon prototype.

Add your selected open-source license here, for example:

``` text
MIT License
```

## 👨‍💻 Team

**KisanFlow AI Team**

-   Team Lead --- \[Name\]
-   AI/ML --- \[Name\]
-   Backend --- \[Name\]
-   Frontend --- \[Name\]
-   Data/GIS --- \[Name\]
-   UI/UX --- \[Name\]
