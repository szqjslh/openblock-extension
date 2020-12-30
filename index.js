const formatMessage = require('format-message');
formatMessage.setup({
    locale: 'zh-cn',
    translations: require('./locales.js')
});

const express = require('express');
let extensions = require('require-all')({
    dirname: `${__dirname}/src`,
    filter: /index.js$/,
    recursive: true
});

extensions = Object.entries(extensions);
extensions = extensions.map(ext => ext[1]['index.js']);

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(`${__dirname}/src`));

app.get('/', (req, res) => {
    res.send(JSON.stringify(extensions));
});

app.listen(20120);
