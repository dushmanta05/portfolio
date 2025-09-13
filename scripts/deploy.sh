#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting deployment..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "🟩 Loaded environment variables"
    echo "🌐 Server will run on ${HOST}:${PORT}"
else
    echo "🟥 .env file not found!"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project
echo "🛠️ Building the project..."
pnpm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "🟥 Build failed! dist directory not found."
    exit 1
fi

# Stop existing PM2 process (if running)
echo "🛑 Stopping existing process..."
pm2 stop astro-portfolio 2>/dev/null || echo "No existing process found"

# Start the application with PM2
echo "▶️ Starting application..."
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

# Show status
pm2 status

echo "🎉 Deployment completed successfully!"
echo "🌐 Application running on: http://${HOST}:${PORT}"
echo "📊 Check status: pm2 status"
echo "📋 View logs: pm2 logs astro-portfolio"
