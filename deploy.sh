mkdir tmp
cd tmp
cp -r ../dist syphonx
zip -r syphonx.zip syphonx
gh release create v0.9.7 syphonx.zip --generate-notes
