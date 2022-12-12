CALL npx parcel build --no-optimize src/background.ts
CALL npx parcel build --no-optimize --no-content-hash src/devtools.html
CALL npx parcel build --no-optimize --no-content-hash src/panel/panel.html
