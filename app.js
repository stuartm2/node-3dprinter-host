
const express = require('express');
const exhbs  = require('express-handlebars');
const views = require('./views.js');

const hbrConfig = {
    extname: '.tpl',
    defaultLayout: 'main',
    helpers: views.helpers
};

const hbr = exhbs.create(hbrConfig);
const app = express();

app.engine('.tpl', hbr.engine);
app.set('view engine', 'tpl');
app.use('/static', express.static('static'));
app.get('/', views.listFiles);
app.get('/files/:file/info', views.getFile);
app.delete('/files/:file', views.deleteFile)

app.listen(3000, () => console.log('Example app listening on port 3000!'));
