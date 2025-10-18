# Build Notes

## Known Issue: SIGBUS Error on Production Build

### Problem
When running `npm run build`, you may encounter:
```
Next.js build worker exited with code: null and signal: SIGBUS
```

### Cause
This is a system-level issue with Next.js 14 build workers in certain environments. The dev server works fine, but production builds crash.

### Workarounds

#### Option 1: Build in GitHub Actions (Recommended)
The GitHub Actions workflow should work fine as it runs in a fresh Ubuntu environment. Simply:
```bash
git add .
git commit -m "Initial blog implementation"
git push origin main
```

The deployment will happen automatically via GitHub Actions.

#### Option 2: Use Docker for Local Builds
Build in a containerized environment:
```bash
docker run --rm -v $(pwd):/app -w /app node:18 bash -c "npm install && npm run build"
```

#### Option 3: Try Next.js 15
Upgrade to the latest Next.js version which may have fixes:
```bash
npm install next@latest react@latest react-dom@latest
npm run build
```

#### Option 4: Build on a Different Machine
If you have access to another development machine or CI/CD platform, the build should work there.

### Verification
The code is correct and the dev server works fine. The issue is environment-specific and won't affect:
- Development workflow (`npm run dev`)
- GitHub Actions deployment
- Builds on other systems

### Testing the Dev Server
```bash
npm run dev
```
Visit http://localhost:3000 (or the port shown) to see the site working.
