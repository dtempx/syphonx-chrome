REM copy node_modules\jquery\dist\jquery.slim.js build
REM copy node_modules\syphonx-core\index.js build\syphonx.js
CALL npx parcel build --no-source-maps --no-optimize --no-content-hash src/panel/panel.html
REM CALL npx parcel build --no-source-maps --no-optimize --no-content-hash src/devtools.html
REM CALL npx parcel build --no-source-maps --no-optimize src/background.ts
REM CALL npx http-server dist -c-1 -o
