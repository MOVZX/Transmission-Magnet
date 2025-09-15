function saveOptions() {
    const url = document.getElementById("url").value;
    const paused = document.getElementById("paused").checked;
    const notifications = document.getElementById("notifications").checked;
    const torrentSupport = document.getElementById("torrent-support").checked;
    const authEnabled = document.getElementById("auth-enabled").checked;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    chrome.storage.sync.set(
        {
            transmissionUrl: url,
            addPaused: paused,
            showNotifications: notifications,
            torrentSupport: torrentSupport,
            authEnabled: authEnabled,
            username: username,
            password: password,
        },
        () => {
            const status = document.getElementById("status");
            status.textContent = "Options saved.";

            setTimeout(() => {
                status.textContent = "";
            }, 1500);
        }
    );
}

function restoreOptions() {
    chrome.storage.sync.get(
        {
            transmissionUrl: "http://192.168.8.2:9090/transmission/rpc",
            addPaused: true,
            showNotifications: true,
            torrentSupport: true,
            authEnabled: false,
            username: "",
            password: "",
        },
        (items) => {
            document.getElementById("url").value = items.transmissionUrl;
            document.getElementById("paused").checked = items.addPaused;
            document.getElementById("notifications").checked = items.showNotifications;
            document.getElementById("torrent-support").checked = items.torrentSupport;
            document.getElementById("auth-enabled").checked = items.authEnabled;
            document.getElementById("username").value = items.username;
            document.getElementById("password").value = items.password;

            toggleAuthFields();
        }
    );
}

function toggleAuthFields() {
    const authEnabled = document.getElementById("auth-enabled").checked;
    document.getElementById("auth-credentials").style.display = authEnabled ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("auth-enabled").addEventListener("change", toggleAuthFields);
