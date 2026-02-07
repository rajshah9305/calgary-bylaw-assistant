# ⚡ Quick Start Guide

Get up and running in 5 minutes!

---

## 🚀 Option 1: Run Locally (5 minutes)

### Step 1: Clone & Install (2 minutes)
```bash
# Clone the repository
git clone https://github.com/yourusername/calgary-bylaw-assistant.git
cd calgary-bylaw-assistant

# Install dependencies
npm install
```

### Step 2: Configure (1 minute)
```bash
# Create environment file
cp .env.example .env

# Edit .env and add your Mapbox token
# Get one free at: https://account.mapbox.com/access-tokens/
```

Your `.env` file should look like:
```env
VITE_MAPBOX_TOKEN=pk.your_token_here
```

### Step 3: Run (1 minute)
```bash
# Start development server
npm run dev

# Open browser to http://localhost:8080
```

**Done!** 🎉 The app is now running locally.

---

## 🌐 Option 2: Deploy to Vercel (2 minutes)

### Prerequisites
- GitHub account
- Vercel account (free)
- Mapbox token

### Step 1: Push to GitHub (30 seconds)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/calgary-bylaw-assistant.git
git push -u origin main
```

### Step 2: Deploy to Vercel (1 minute)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Name: `VITE_MAPBOX_TOKEN`
   - Value: Your Mapbox token
5. Click "Deploy"

### Step 3: Visit Your Live Site (30 seconds)
- Wait for deployment to complete
- Click the provided URL
- Your app is live! 🎉

---

## 🎯 First Time Using the App?

### 1. Watch the Tour
- The onboarding tour starts automatically
- Learn the basics in 5 steps
- Skip anytime if you prefer

### 2. Try a Search
```
Example addresses to try:
- 123 Main St SW, Calgary
- 456 Centre St N, Calgary
- 789 17 Ave SE, Calgary
```

### 3. Click the Map
- Click any colored area on the map
- See instant zoning analysis
- Explore different neighborhoods

### 4. Get Help
- Click "Help" button (top-right)
- Click floating help button (bottom-right)
- Hover over ? icons for tooltips

---

## 📝 Common Tasks

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Run Linter
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

---

## 🔧 Troubleshooting

### Map Not Loading?
1. Check your Mapbox token in `.env`
2. Ensure token starts with `pk.`
3. Verify token is valid at [mapbox.com](https://account.mapbox.com/access-tokens/)

### Build Fails?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Port Already in Use?
```bash
# Use different port
npm run dev -- --port 3000
```

---

## 📚 Next Steps

### Learn More
- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` for deployment options
- See `CONTRIBUTING.md` to contribute

### Customize
- Update branding in `src/components/Header.tsx`
- Modify colors in `tailwind.config.ts`
- Add features in `src/lib/`

### Deploy
- Follow `DEPLOYMENT.md` for detailed guide
- Use `GITHUB_SETUP.md` for GitHub integration
- Check `VERIFICATION_CHECKLIST.md` before deploying

---

## 🎓 Understanding the App

### Key Files
```
src/
├── pages/Index.tsx          # Main page
├── components/
│   ├── ZoningMap.tsx       # Interactive map
│   ├── FeasibilityReport.tsx # Analysis results
│   └── OnboardingTour.tsx  # First-time tour
├── lib/
│   ├── zoning-analysis.ts  # Core logic
│   └── geocoding.ts        # Address search
```

### Key Features
1. **Search** - Find properties by address
2. **Map** - Click parcels for analysis
3. **Analysis** - See what you can build
4. **Export** - Download reports
5. **Help** - Always available

---

## 💡 Pro Tips

### For Development
- Use `npm run dev` for hot reload
- Check browser console for errors
- Use React DevTools for debugging

### For Users
- Try the onboarding tour first
- Use tooltips to learn terms
- Export reports for sharing

### For Deployment
- Test build locally first
- Add environment variables
- Monitor Vercel logs

---

## 🆘 Getting Help

### In the App
- Click "Help" button
- Watch onboarding tour
- Hover over ? icons

### Documentation
- `README.md` - Main docs
- `DEPLOYMENT.md` - Deployment
- `CONTRIBUTING.md` - Contributing

### External
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

## ✅ Checklist

Before you start:
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Mapbox token obtained
- [ ] Git installed (for deployment)

After setup:
- [ ] App runs locally
- [ ] Map loads correctly
- [ ] Search works
- [ ] Help system accessible

---

## 🎉 You're Ready!

Choose your path:
- **Local Development**: Run `npm run dev`
- **Production Deployment**: Push to GitHub → Deploy to Vercel
- **Learning**: Explore the code and documentation

**Happy coding!** 🚀

---

**Need help?** Check the documentation or open an issue on GitHub.
