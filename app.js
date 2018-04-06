
const ip = require("ip");
const express = require('express');
const fileUpload = require('express-fileupload');
const exhbs  = require('express-handlebars');
const views = require('./views.js');

const appConfig = {
    port: 3000
};

const hbrConfig = {
    extname: '.tpl',
    defaultLayout: 'main',
    helpers: views.helpers
};

const hbr = exhbs.create(hbrConfig);
const app = express();

app.use(fileUpload());
app.engine('.tpl', hbr.engine);
app.set('view engine', 'tpl');
app.use('/static', express.static('static'));
app.get('/', views.listFiles);
app.get('/files/:file/info', views.getFile);
app.get('/files/:file/row', views.getFileRow);
app.post('/files', views.addFile);
app.post('/files/:file/print', views.printFile);
app.delete('/files/:file', views.deleteFile);

app.listen(appConfig.port, () => console.log(`Serving at http://${ip.address()}:${appConfig.port}`));
