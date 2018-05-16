
const ip = require("ip"),
    express = require('express'),
    fileUpload = require('express-fileupload'),
    hbr = require('express-handlebars'),
    views = require('./views.js'),

    appConfig = {
        port: 3000
    },

    hbrConfig = {
        extname: '.tpl',
        defaultLayout: 'main',
        helpers: views.helpers
    };

express()
    .use(fileUpload())
    .engine('.tpl', hbr.create(hbrConfig).engine)
    .set('view engine', 'tpl')
    .use('/static', express.static('static'))

    .get('/', (req, res) => res.redirect('/files'))
    .get('/files', views.listFiles)
    .post('/files', views.addFile)
    .delete('/files/:file', views.deleteFile)
    .get('/files/:file/info', views.getFile)
    .get('/files/:file/row', views.getFileRow)
    .post('/files/:file/print', views.printFile)

    .listen(appConfig.port, () => console.log(`Serving at http://${ip.address()}:${appConfig.port}`));
