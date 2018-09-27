#!/bin/bash

# Build the web application and put the static files into the build directory for serving
echo "Building web application"
cd ../baliogg-web-app/
npm run build 
cd ../backend/ 
mkdir -p build/static
cp -r ../baliogg-web-app/build/* build/static
echo "Finished building web application"

# Build the backend dependencies and copy them into the build directory
echo "Building backend application"
mv node_modules node_modules_temp && npm i --production && mv node_modules build/node_modules && mv node_modules_temp node_modules

# Copying empty database into the build directory
cp database-template.json build/database.json