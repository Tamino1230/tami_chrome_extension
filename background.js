const TAB_LIMIT = 8; 

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ tabLimit: TAB_LIMIT });
});

chrome.tabs.onCreated.addListener(async (tab) => {
    let tabs = await chrome.tabs.query({});
    if (tabs.length > TAB_LIMIT) {
        chrome.tabs.remove(tab.id);
    }

    if (tabs.length > TAB_LIMIT) {
        chrome.action.openPopup();
    }
});