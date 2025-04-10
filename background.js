const TAB_LIMIT = 8; 

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ tabLimit: TAB_LIMIT });
});

chrome.tabs.onCreated.addListener(async (tab) => {
    let tabs = await chrome.tabs.query({});
    if (tabs.length > TAB_LIMIT) {
        try {
            chrome.tabs.remove(tab.id);
        } catch (error) {
            console.error("Error removing tab:", error);
        }
        
    }

    if (tabs.length > TAB_LIMIT) {
        try {
            chrome.action.openPopup();
        } catch (error) {
            console.error("Error opening popup:", error);
        }
        
    }
});