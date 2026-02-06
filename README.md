# Calgary Bylaw Assistant

An interactive web application for analyzing Calgary zoning bylaws and development feasibility. Click on any parcel on the map or search by address to see what types of residential development are permitted.

## Features

- **Interactive Zoning Map**: Powered by Mapbox GL and Calgary Open Data
- **Real-time Analysis**: Instant feasibility reports for backyard suites, secondary suites, and rowhouses
- **Zoning Intelligence**: Automated analysis of R-C1, R-C2, R-CG, and Direct Control districts
- **Community Context**: View zoning within Calgary community boundaries

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Mapping**: Mapbox GL JS
- **Data Source**: Calgary Open Data Portal
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Mapbox access token (free tier available at [mapbox.com](https://mapbox.com))

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:8080`

### First Run Setup

On first launch, you'll be prompted to enter your Mapbox access token. Get one free at:
https://account.mapbox.com/access-tokens/

The token is stored locally in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Base UI components (button, card, dialog, etc.)
│   ├── Header.tsx      # App header
│   ├── SearchBar.tsx   # Address search
│   ├── ZoningMap.tsx   # Interactive map
│   ├── FeasibilityReport.tsx  # Analysis results
│   └── ...
├── lib/                # Utilities
│   ├── zoning-analysis.ts  # Zoning logic
│   └── utils.ts        # Helper functions
├── types/              # TypeScript types
│   └── zoning.ts       # Zoning data types
├── pages/              # Route pages
│   ├── Index.tsx       # Main app page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   └── useMapboxToken.ts
└── main.tsx            # App entry point
```

## Data Sources

- **Zoning Data**: [Calgary Land Use Districts](https://data.calgary.ca/Base-Maps/Land-Use-Districts/qe6k-p9nh)
- **Community Boundaries**: [Calgary Community Boundaries](https://data.calgary.ca/Base-Maps/Community-Boundaries/surr-xmvs)

## Development Notes

- The app uses Calgary's open data APIs directly (no backend required)
- Zoning analysis logic is based on Calgary Land Use Bylaw 1P2007
- Map loads up to 50,000 zoning parcels for performance
- Token is stored in localStorage for convenience

## Disclaimer

This tool provides general information only. Always verify zoning requirements with the City of Calgary Planning Department before proceeding with any development.

## License

MIT
