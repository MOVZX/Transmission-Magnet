function showNotification(title, message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: title,
        message: message,
    });
}

async function addMagnetToTransmission(magnetLink) {
    const settings = await chrome.storage.sync.get({
        transmissionUrl: "http://192.168.8.2:9090/transmission/rpc",
        addPaused: true,
        showNotifications: true,
    });

    const { transmissionUrl, addPaused, showNotifications } = settings;

    try {
        let response = await fetch(transmissionUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                method: "torrent-add",
                arguments: {
                    filename: magnetLink,
                    paused: addPaused,
                },
            }),
        });

        if (response.status === 409) {
            const sessionId = response.headers.get("X-Transmission-Session-Id");

            response = await fetch(transmissionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Transmission-Session-Id": sessionId,
                },
                body: JSON.stringify({
                    method: "torrent-add",
                    arguments: {
                        filename: magnetLink,
                        paused: addPaused,
                    },
                }),
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
        addMagnetToTransmission(msg.magnet);
    }
});
