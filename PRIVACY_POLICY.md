# Privacy Policy for Magnet to Transmission

**Last Updated:** 2025-09-15

This Privacy Policy describes how "Magnet to Transmission" (the "Extension") handles your information when you use our Chrome extension.

## 1. Information We Collect

The Extension is designed to function with minimal data collection. We only collect and store information that is essential for the Extension to work as intended.

The following data is stored locally on your device using Chrome's sync storage (`chrome.storage.sync`), which allows you to sync your settings across your devices where you are logged into your Google account:

-   **Transmission RPC URL:** The URL of your Transmission client.
-   **Add Paused Setting:** Your preference for whether to add torrents in a paused state.
-   **Notifications Setting:** Your preference for showing desktop notifications.
-   **Torrent File Support Setting:** Your preference for handling `.torrent` file links.
-   **Authentication Settings:** Your preference for enabling authentication, and the username and password for your Transmission client if enabled.

**We do not collect, store, or transmit any personal information, browsing history, or any other data unrelated to the Extension's functionality.**

## 2. How We Use Your Information

The information collected is used solely to provide the Extension's features:

-   To connect to your self-hosted Transmission client.
-   To send magnet links and `.torrent` files to your Transmission client according to your configured settings.
-   To display notifications about the status of torrent submissions.

Your settings, including authentication credentials, are stored locally and are only used to communicate directly with your specified Transmission RPC URL. This information is **never** sent to our servers or any third-party services.

## 3. Data Security

We take the security of your data seriously. All settings are stored using Chrome's built-in storage API. If you choose to use Chrome's sync feature, your settings will be protected by your Google account's security.

## 4. Third-Party Services

The Extension does not use any third-party services for tracking, analytics, or advertising. The only external communication is between the Extension and the Transmission RPC URL you provide.

## 5. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.

## 6. Contact Us

If you have any questions about this Privacy Policy, please feel free to open an issue on our [GitHub repository](https://github.com/MOVZX/Transmission-Magnet).
