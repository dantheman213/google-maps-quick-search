console.log("google maps quick search page script loaded");

// Allocate on single global variable
const GMQS = {
    originalUrl: window.location.href,
    timerSatelliteCheck: null
};

// Only execute this piece of code if "?s" is found in URL string
// Satellite mode
if (GMQS.originalUrl.indexOf("?s") > -1) {
    $(document).ready(() => {
        GMQS.timerSatelliteCheck = setInterval(() => {
            const elem = $("button.widget-minimap-shim.widget-minimap-shim-button");
            if (elem.length > 0) {
                elem.click();
                clearInterval(GMQS.timerSatelliteCheck);
                console.log("completed");
            }
            console.log("called");
        }, 500);
    });
}
