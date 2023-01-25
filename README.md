# SyphonX Chrome Extension

This is the Chrome Extension editor/runner for SyphonX—a light weight, no-code web-scraper that runs in any browser.

## New user install
1. Download the latest version from https://github.com/dtempx/syphonx-chrome/releases/
2. Extract the zip file
3. Open Chrome Extensions by clicking on **Settings > Extensions** or navigate to `chrome://extensions`
4. Enable **Developer mode** in the upper right corner *(only have to do this once per system)*
5. Click on **Load unpacked**
6. Navigate to the folder that contains the file extracted from step 2 and click **Open**

To use the extension, hit F12 from any tab to open devtools and select the SyphonX panel.

> The extension must be re-installed after every system restart as manually loaded Chrome extensions do not persist across shutdowns.


## Dev Setup
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
2. Click **Load unpacked**, navigate to the `dist` folder within this project and click **Select Folder**
3. Navigate to any website and open developer tools or hit F12
4. Select the **SyphonX** tab within the developer tools panel.


## Links
* [Roadmap](documentation/roadmap.md)
* [Syphonx API/CLI](https://github.com/dtempx/syphonx)
