# Build script for the frontend and backend
cd frontend || exit 1
npm install
npm run build
cd ../backend || exit 1
npm install
npm run buildlocal