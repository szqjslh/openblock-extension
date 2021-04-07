const OpenBlockExtension = require('./index');

const extensionServer = new OpenBlockExtension();

// Test the update funciton.
extensionServer.checkAndDownloadUpdate().then(info => {
    console.log('info =', info);
    extensionServer.update();
})
    .catch(err => {
        console.log('err =', err);
    });
