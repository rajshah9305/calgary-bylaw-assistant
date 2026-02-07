# 🏠 Calgary Bylaw Assistant

> **Production-ready web application for analyzing Calgary zoning bylaws and development feasibility**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rajshah9305/calgary-bylaw-assistant)

A comprehensive, user-friendly tool that helps property owners, investors, and developers understand what they can build on any Calgary property. Get instant feasibility reports, cost estimates, and expert guidance - all in plain English.

![Calgary Bylaw Assistant](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Capabilities
- **Interactive Zoning Map** - Click any property on the map for instant analysis
- **Smart Address Search** - Find properties by address with real-time geocoding
- **Instant Feasibility Reports** - Know what you can build in seconds
- **Plain English Results** - No confusing jargon, just clear answers

### 🚀 Advanced Features
- **Detailed Analysis** - Lot requirements, setbacks, parking, costs & timelines
- **Property Comparison** - Compare multiple properties with 0-100 scoring
- **Smart Notifications** - Get alerts about zoning changes and bylaw updates
- **Multi-Format Export** - Download reports as PDF, CSV, Markdown, or JSON
- **Development Scoring** - AI-powered potential assessment
- **Interactive Help** - Onboarding tour, tooltips, and always-available assistance

### 🎨 User Experience
- **Beginner-Friendly** - Interactive tour for first-time users
- **Accessible** - Keyboard navigation, screen reader support, high contrast
- **Mobile-Optimized** - Works perfectly on all devices
- **Fast & Responsive** - Built with performance in mind

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Mapbox access token ([Get one free](https://account.mapbox.com/access-tokens/))

### Installation

```bash
# Clone the repository
git clone https://github.com/rajshah9305/calgary-bylaw-assistant.git
cd calgary-bylaw-assistant

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Mapbox token to .env
# VITE_MAPBOX_TOKEN=your_token_here

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see the app in action!

### First-Time Setup
On first launch, you'll be prompted to enter your Mapbox token. The app includes:
- ✅ Interactive onboarding tour
- ✅ Built-in help system
- ✅ Tooltips for technical terms
- ✅ Sample data to explore

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **One-Click Deploy**
   ```bash
   # Push to GitHub
   git push origin main
   
   # Import to Vercel
   # Visit vercel.com and import your repository
   ```

2. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `VITE_MAPBOX_TOKEN` with your token

3. **Deploy!**
   - Vercel automatically builds and deploys
   - Get your live URL instantly

### Manual Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Output in /dist folder
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS + shadcn/ui
- **Mapping**: Mapbox GL JS
- **Routing**: React Router v6
- **Data**: Calgary Open Data Portal

## 📁 Project Structure

```
calgary-bylaw-assistant/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Base UI components
│   │   ├── HelpButton.tsx  # Help system
│   │   ├── OnboardingTour.tsx
│   │   ├── FeasibilityReport.tsx
│   │   └── ...
│   ├── lib/                # Business logic
│   │   ├── zoning-analysis.ts
│   │   ├── advanced-analysis.ts
│   │   ├── comparison.ts
│   │   └── ...
│   ├── pages/              # Route pages
│   ├── hooks/              # Custom hooks
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── .env.example           # Environment template
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## 🎯 Usage Guide

### For Homeowners
1. Search your address or click your property on the map
2. See instantly if you can build a backyard suite or secondary suite
3. Get cost estimates and approval timelines
4. Export a professional report

### For Investors
1. Compare multiple properties side-by-side
2. View development potential scores (0-100)
3. Identify best opportunities
4. Export data for analysis

### For Developers
1. Quick feasibility checks
2. Detailed lot requirements
3. Cost and timeline planning
4. Multiple export formats

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🔧 Configuration

### Environment Variables

```env
# Required
VITE_MAPBOX_TOKEN=your_mapbox_token_here

# Optional
VITE_APP_NAME=Calgary Bylaw Assistant
VITE_APP_URL=http://localhost:8080
```

### Mapbox Token
Get a free token at [mapbox.com](https://account.mapbox.com/access-tokens/):
1. Create account (free)
2. Generate new token
3. Add to `.env` file

## 📚 Documentation

- **User Guide**: Built-in help system (click Help button in app)
- **Onboarding Tour**: Automatic on first visit
- **Tooltips**: Hover over ? icons for explanations
- **City Resources**: Links to Calgary Planning Department

## 🌟 Key Features Explained

### Development Scoring
Properties are scored 0-100 based on:
- Feasibility status (40 points)
- Floor Area Ratio potential (20 points)
- Site coverage (15 points)
- Cost efficiency (15 points)
- Opportunities vs risks (10 points)

### Export Formats
- **PDF**: Print-ready professional reports
- **CSV**: Import into Excel/Google Sheets
- **Markdown**: Developer-friendly documentation
- **JSON**: API integration and data analysis

### Smart Notifications
Get alerts about:
- Blanket rezoning initiatives
- Bylaw changes
- Permit process updates
- Community planning changes

## 🔒 Privacy & Data

- No backend server required
- All data stored locally in browser
- No personal information collected
- Mapbox token stored securely in localStorage

## ⚠️ Disclaimer

This tool provides general information only. Always verify zoning requirements with the City of Calgary Planning Department (call 311) before proceeding with any development.

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- City of Calgary Open Data Portal
- Mapbox for mapping services
- shadcn/ui for beautiful components
- Calgary Land Use Bylaw 1P2007

## 📞 Support

- **City of Calgary Planning**: Call 311
- **Website**: [calgary.ca/planning](https://www.calgary.ca/planning)
- **Email**: planning@calgary.ca

---

**Made with ❤️ for Calgary property owners and developers**

*Last Updated: February 2026*
