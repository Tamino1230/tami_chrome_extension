document.addEventListener("DOMContentLoaded", async () => {
    const tabList = document.getElementById("tab-list");
    if (!tabList) {
        console.error("Tab list element not found.");
        return;
    }

    const tabStatus = document.getElementById("tab-status");
    const tabMessage = document.getElementById("tab-message");

    try {
        const { tabLimit } = await chrome.storage.sync.get({ tabLimit: 8 });

        let tabs = await chrome.tabs.query({});
        const remainingTabs = tabLimit - tabs.length;

        if (remainingTabs <= 0) {
            tabStatus.style.color = "red";
            tabStatus.textContent = "Tab Limit Reached";
            tabMessage.textContent = "You need to close some tabs before opening new ones.";
        } else {
            tabStatus.style.color = "green";
            tabStatus.textContent = "Tabs Available";
            tabMessage.textContent = `You still have ${remainingTabs} tabs to open.`;
        }

        if (tabs.length === 0) {
            document.getElementById("fallback-message").style.display = "block";
            return;
        }

        tabs.forEach((tab) => {
            const tabElement = document.createElement("div");
            tabElement.style.marginBottom = "10px";

            tabElement.textContent = tab.title || "Untitled Tab";

            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.style.marginLeft = "10px";
            closeButton.style.padding = "5px";
            closeButton.style.cursor = "pointer";

            closeButton.addEventListener("click", async () => {
                await chrome.tabs.remove(tab.id);
                tabElement.remove();
            });

            tabElement.appendChild(closeButton);
            tabList.appendChild(tabElement);
        });
    } catch (error) {
        console.error("Error fetching tabs or tab limit:", error);
    }
});

function addNyanCat() {
    const nyanCat = document.createElement("img");
    nyanCat.src = "https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif"; // Nyan Cat GIF
    nyanCat.style.position = "fixed";
    nyanCat.style.bottom = "50px";
    nyanCat.style.left = "-200px";
    nyanCat.style.width = "100px";
    nyanCat.style.zIndex = "1000";
    nyanCat.style.transition = "left 5s linear";

    document.body.appendChild(nyanCat);

    setTimeout(() => {
        nyanCat.style.left = "100%";
    }, 100);

    setTimeout(() => {
        nyanCat.remove();
    }, 6000);
}


if (Math.random() < 0.3) {
    addNyanCat();
}