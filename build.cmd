copy node_modules\jquery\dist\jquery.slim.js build
copy node_modules\syphonx-core\index.js build\syphonx.js


npx parcel build test1.ts --dist-dir dist/ --no-source-maps --no-optimize
npx parcel build test1.html --dist-dir dist/ --no-source-maps --no-optimize
