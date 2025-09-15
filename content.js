document.addEventListener("click", function (e) {
    const link = e.target.closest("a");

    if (link && link.href) {
        if (link.href.startsWith("magnet:")) {
            e.preventDefault();
            chrome.runtime.sendMessage({
                type: "magnetClicked",
                magnet: link.href,
            });
        } else if (link.href.endsWith(".torrent")) {
            chrome.storage.sync.get({ torrentSupport: true }, (settings) => {
                if (settings.torrentSupport) {
                    e.preventDefault();
                    chrome.runtime.sendMessage({
                        type: "torrentFileClicked",
                        url: link.href,
                    });
                }
            });
        }
    }
});
