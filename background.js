const baseMapsUrl = "https://www.google.com/maps/place/";

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: "Map",
    contexts:["selection"],
    onclick: function(info, tab) {
        lookupMaps(info.selectionText, null);
    }
});

chrome.contextMenus.create({
    title: "Satellite",
    contexts:["selection"],
    onclick: function(info, tab) {
        lookupMaps(info.selectionText, "s");
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "satellite-shortcut") {
        chrome.tabs.executeScript( {
            code: "window.getSelection().toString();"
        }, (selection) => {
            lookupMaps(selection[0], "s");
        });
    } else if (command === "map-shortcut") {
        chrome.tabs.executeScript( {
            code: "window.getSelection().toString();"
        }, function(selection) {
            lookupMaps(selection[0], null);
        });
    }
});

function lookupMaps(str, param) {
    let url = baseMapsUrl + str.replace(/\n/g, " ").replace(/ /g, "+");
    if (param != null) {
        url += "?" + param;
    }

    chrome.tabs.create({ url: url });
}
