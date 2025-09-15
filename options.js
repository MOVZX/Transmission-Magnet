function saveOptions() {
    const url = document.getElementById('url').value;
    const paused = document.getElementById('paused').checked;
    const notifications = document.getElementById('notifications').checked;

    chrome.storage.sync.set({
        transmissionUrl: url,
        addPaused: paused,
        showNotifications: notifications
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';

        setTimeout(() => {
            status.textContent = '';
        }, 1500);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        transmissionUrl: 'http://192.168.8.2:9090/transmission/rpc',
        addPaused: true,
        showNotifications: true
    }, (items) => {
        document.getElementById('url').value = items.transmissionUrl;
        document.getElementById('paused').checked = items.addPaused;
        document.getElementById('notifications').checked = items.showNotifications;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
