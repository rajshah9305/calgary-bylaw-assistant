#!/bin/bash

# Calgary Bylaw Assistant - Setup Script
# This script helps you set up the project quickly

set -e

echo "🏠 Calgary Bylaw Assistant - Setup"
echo "=================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "   Current version: $(node -v)"
    echo "   Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Add your Mapbox token to .env file"
    echo "   Get one free at: https://account.mapbox.com/access-tokens/"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check
echo "✅ Type check passed"
echo ""

# Run linter
echo "🧹 Running linter..."
npm run lint
echo "✅ Linter passed"
echo ""

# Build the project
echo "🏗️  Building project..."
npm run build
echo "✅ Build successful"
echo ""

echo "=================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Mapbox token to .env file"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:8080"
echo ""
echo "For deployment:"
echo "- See DEPLOYMENT.md for Vercel deployment guide"
echo "- Run 'npm run build' to create production build"
echo ""
echo "Happy coding! 🚀"
