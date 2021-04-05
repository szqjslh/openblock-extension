const OpenBlockExtension = require('./index');

const extensionServer = new OpenBlockExtension();
extensionServer.checkForUpdates().then(sta => {
    console.log(`new version detected?: ${sta}`);

    if (sta) {
        extensionServer.update();
    }
});
