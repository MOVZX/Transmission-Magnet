document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href^='magnet:']");

    if (link) {
        e.preventDefault();

        chrome.runtime.sendMessage({
            type: "magnetClicked",
            magnet: link.href
        });
    }
});
