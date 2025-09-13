#!/bin/bash

# Jekyll Site Deployment Script
# This script builds and deploys the Jekyll site

echo "🚀 Starting Jekyll site deployment..."

# Set the PATH to include local gems
export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"

# Clean previous build
echo "🧹 Cleaning previous build..."
bundle exec jekyll clean

# Build the site
echo "🔨 Building site..."
bundle exec jekyll build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Site built successfully!"
    echo "📁 Site files are in the _site/ directory"
    echo ""
    echo "🌐 To view locally, run: bundle exec jekyll serve"
    echo "📤 To deploy to GitHub Pages, push to main branch"
else
    echo "❌ Build failed!"
    exit 1
fi

