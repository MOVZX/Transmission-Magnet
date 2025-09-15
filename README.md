# Magnet to Transmission

<p align="center">
  <img src="icon.png" alt="Magnet to Transmission Icon" width="128">
</p>

<p align="center">
  A simple Chrome extension that sends clicked magnet links and `.torrent` files directly to your Transmission BitTorrent client.
</p>

---

## Features

-   **One-Click Sending:** Automatically intercepts magnet link and `.torrent` file clicks and sends them to your Transmission client.
-   **`.torrent` File Support:** Forwards `.torrent` file links directly to Transmission, just like magnet links. This can be toggled in the settings.
-   **Authentication Support:** Securely connect to your Transmission client with optional username and password authentication.
-   **Seamless Integration:** Works on any webpage without interfering with your browsing.
-   **Configurable:** Easily configure your Transmission server settings.
-   **Add Paused:** Option to add torrents in a paused state, giving you control over when they start downloading.
-   **Desktop Notifications:** Get notified when a torrent is successfully added or if an error occurs.
-   **Easy Access:** All settings are available in a convenient popup by clicking the extension icon.

## Installation

### From Source

1.  Clone or download this repository.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory where you cloned/downloaded the repository.

## Usage

1.  Click on the extension icon in your Chrome toolbar to open the settings popup.
2.  Configure the **Transmission RPC URL** to point to your Transmission client's RPC endpoint (e.g., `http://localhost:9090/transmission/rpc`).
3.  Adjust other settings like "Add Paused" and "Notifications" to your preference.
4.  Click "Save Settings".
5.  Now, whenever you click a magnet link on any website, it will be sent directly to your Transmission client.

## Configuration

The following options are available in the settings popup:

-   **Transmission RPC URL:** The full URL for your Transmission RPC endpoint.
-   **Add Paused:** If enabled, new torrents will be added in a paused state.
-   **Notifications:** If enabled, a desktop notification will be shown on success or error.
-   **Torrent File Support:** If enabled, the extension will intercept clicks on `.torrent` file links.
-   **Enable Authentication:** If enabled, you can provide a username and password to authenticate with your Transmission client.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/MOVZX">MOVZX</a>
</p>
