CALL npx parcel build --no-source-maps --no-optimize src/background.ts
CALL npx parcel build --no-source-maps --no-optimize --no-content-hash src/devtools.html
CALL npx parcel build --no-source-maps --no-optimize --no-content-hash src/panel/panel.html
