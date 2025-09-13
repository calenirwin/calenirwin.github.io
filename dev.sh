#!/bin/bash

# Jekyll Development Script
# This script starts the Jekyll development server

echo "🚀 Starting Jekyll development server..."

# Set the PATH to include local gems (using correct Ruby version)
export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"

# Start the development server
echo "🌐 Starting server at http://localhost:4000"
echo "📝 Auto-regeneration enabled - changes will reload automatically"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Use the system bundle command which is available at /usr/bin/bundle
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload

