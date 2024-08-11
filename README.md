# Picture-in-Picture (PiP) Mode Chrome Extension

## Overview

This Chrome extension allows you to easily toggle Picture-in-Picture (PiP) mode for videos on popular streaming and video sites like YouTube, Netflix, Disney+, and many more. The extension is lightweight and requires no configuration—just click the icon to switch PiP mode on or off.

## Features

- **One-Click PiP Mode:** Instantly toggle Picture-in-Picture mode on supported sites.
- **Extensive Site Support:** Includes a comprehensive list of supported sites in a `sites.json` file, which you can easily customize.

## Installation Guide

You can set up the PiP feature by manually unpacking the extension. Follow the steps below to get started:

### Step 1: Download the Extension Files

1. Download the repository as a ZIP file by clicking the **Code** button at the top of the page.
2. Extract the files to a folder on your computer.

### Step 2: Load the Unpacked Extension

1. Open Google Chrome.
2. Go to `chrome://extensions/` in your browser's address bar.
3. Enable **Developer mode** by toggling the switch in the upper right corner.
4. Click the **Load unpacked** button that appears.
5. Select the folder where you extracted the extension files.

### Step 3: Test the Extension

1. Visit any of the supported sites listed in `background.js` (e.g., YouTube, Netflix, Disney+).
2. Play a video on the site.
3. Click the PiP extension icon in the Chrome toolbar to toggle Picture-in-Picture mode.

### Step 4: Customizing the Supported Sites

1. Open the `background.js` file located in the extension folder.
2. Add or remove domains in the `"supportedSites"` array to customize which sites the extension supports.
3. After editing, **Reload** the extension in Chrome by going to `chrome://extensions/` and clicking the **Reload** button under your extension.

## Troubleshooting

If you encounter any issues:

- Ensure that you are on a supported site.
- Check the console logs by opening the Developer Tools (Right-click > Inspect > Console) to see any error messages.
- Make sure the extension is properly loaded by checking the `chrome://extensions/` page.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute the code for personal or commercial use.