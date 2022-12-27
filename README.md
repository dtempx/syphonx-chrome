# SyphonX Chrome Extension

This is the Chrome Extension editor/runner for SyphonX—a light weight, no-code web-scraper that runs in any browser.


## Setup
```
git clone https://github.com/dtempx/syphonx-chrome.git
cd syphonx-chrome
yarn install
```


## Build/Test
* `npx tsc` to build source
* `yarn test` to run unit tests


## Build/Package
* `yarn build` to build Chrome Extension package
* `yarn start` to test UI outside of Chrome


## Test Chrome Extension
1. Open Chrome web-browser
2. Goto `chrome://extensions` to open the **Extensions** page
3. Click `Load unpacked` and navigate to `dist` folder to load Chrome Extension


## Install Chrome Extension
1. Open Chrome and navigate to **chrome://extensions**
2. Click **Load unpacked**, navigate to the build folder within this project and click **Select Folder**
3. Navigate to any website and open developer tools or hit F12
4. Select the SyphonX tab within the developer tools panel.


## Links
* [Roadmap](documentation/roadmap.md)
* [Syphonx API/CLI](https://github.com/dtempx/syphonx)
