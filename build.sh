#!/bin/bash
npx parcel build --no-optimize src/background.ts
npx parcel build --no-optimize --no-content-hash src/devtools.html
npx parcel build --no-optimize --no-content-hash src/panel/panel.html
