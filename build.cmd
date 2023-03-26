CALL npx parcel build --no-optimize src/background/service_worker.ts
CALL npx parcel build --no-optimize --no-content-hash src/devtools.html
CALL npx parcel build --no-optimize --no-content-hash src/panel/panel.html
copy node_modules\jquery\dist\jquery.slim.js dist\
copy node_modules\syphonx-core\dist\umd\syphonx.js dist\
