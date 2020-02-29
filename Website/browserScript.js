
window.onload = function() {
    var div = document.createElement('div');
    div.innerHTML = "Browser CodeName: " + navigator.appCodeName + 
     "<br>Browser Name: " + navigator.appName + 
     "<br>Browser Version: " + navigator.appVersion + 
     "<br>Cookies Enabled: " + navigator.cookieEnabled + 
     "<br>Browser Language: " + navigator.language + 
     "<br>Browser Online: " + navigator.onLine + 
     "<br>Platform: " + navigator.platform + 
     "<br>User-agent header: " + navigator.userAgent;
    browserNavigator.appendChild(div);


    var bScreen = document.createElement('div');
    bScreen.innerHTML = "Total Height/Width: " + screen.height + " x " + screen.width + 
    "<br>Available Height/Width: " + screen.availHeight + " x " + screen.availWidth + 
    "<br>Color Depth: " + screen.colorDepth + 
    "<br>Color Resolution: " + screen.pixel;
    browserScreen.appendChild(bScreen);

    var windowInfo = document.createElement('div'); 
    windowInfo.innerHTML = "Outer Height / Outer Width: " + window.outerHeight + ' x ' + window.outerWidth;
    browserWindow.appendChild(windowInfo);
}

