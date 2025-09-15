function showNotification(title, message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: title,
        message: message,
    });
}

async function addTorrentToTransmission(torrent, isMagnet = true) {
    const settings = await chrome.storage.sync.get({
        transmissionUrl: "http://192.168.8.2:9090/transmission/rpc",
        addPaused: true,
        showNotifications: true,
        authEnabled: false,
        username: "",
        password: "",
    });

    const { transmissionUrl, addPaused, showNotifications, authEnabled, username, password } = settings;

    const requestBody = {
        method: "torrent-add",
        arguments: {
            paused: addPaused,
        },
    };

    if (isMagnet) {
        requestBody.arguments.filename = torrent;
    } else {
        requestBody.arguments.metainfo = torrent;
    }

    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (authEnabled) {
            headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
        }

        let response = await fetch(transmissionUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        if (response.status === 409) {
            const sessionId = response.headers.get("X-Transmission-Session-Id");
            headers["X-Transmission-Session-Id"] = sessionId;

            response = await fetch(transmissionUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestBody),
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (showNotifications) {
            if (data.result === "success") {
                const torrentName = data.arguments["torrent-added"]?.name || "Torrent";

                showNotification("Torrent Added", `${torrentName} was sent to Transmission.`);
            } else {
                showNotification("Transmission Error", `Failed to add torrent: ${data.result}`);
            }
        }
    } catch (error) {
        if (showNotifications) {
            showNotification("Connection Error", "Could not connect to Transmission RPC.");
        }
    }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "magnetClicked") {
        addTorrentToTransmission(msg.magnet);
    } else if (msg.type === "torrentFileClicked") {
        fetch(msg.url)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result.split(",")[1];
                    addTorrentToTransmission(base64, false);
                };
                reader.readAsDataURL(blob);
            })
            .catch((error) => {
                if (showNotifications) {
                    showNotification("Download Error", "Failed to download the .torrent file.");
                }
            });
    }
});
