#!/bin/bash
outdir=dist/syphonx
npx parcel build --no-optimize src/background/service_worker.ts --dist-dir $outdir
npx parcel build --no-optimize --no-content-hash src/devtools.html --dist-dir $outdir
npx parcel build --no-optimize --no-content-hash src/panel/panel.html --dist-dir $outdir
cp src/extension/* $outdir
