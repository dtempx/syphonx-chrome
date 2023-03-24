#!/bin/bash
npx parcel build --no-optimize src/background.ts
npx parcel build --no-optimize --no-content-hash src/devtools.html
npx parcel build --no-optimize --no-content-hash src/panel/panel.html
cp node_modules/jquery/dist/jquery.slim.js dist/
cp node_modules/syphonx-core/dist/umd/syphonx.js dist/
