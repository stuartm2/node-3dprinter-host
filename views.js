
const fs = require('fs');
const _ = require('lodash');

function bytes(val) {
    var gb = val / (1024 * 1024 * 1024);
    var mb = val / (1024 * 1024);
    var kb = val / 1024;

    if (gb >= 1) {
        return gb.toFixed(1) + ' Gb';
    } else if (mb >= 1) {
        return mb.toFixed(1) + ' Mb';
    } else if (kb >= 1) {
        return kb.toFixed(1) + ' Kb';
    } else {
        return val.toFixed(1) + ' b';
    }
}

function strip_filetype(val) {
    var i = val.lastIndexOf('.');
    return (i >= 0) ? val.slice(0, i) : val;
}

function strip_filename(val) {
    var i = val.lastIndexOf('.');
    return (i >= 0) ? _.toUpper(val.slice(i + 1)) : 'UNKNOWN';
}

function listFiles(req, res) {
    var files = [];
    var basedir = '/Users/stuartm/Downloads/Print Queue/';
    fs.readdirSync(basedir).forEach(function (f) {
        if (!_.startsWith(f, '.')) {
            files.push({
                name: f,
                size: fs.statSync(basedir + f).size
            });
        }
    });

    return res.render('files', {
        files
    });
    return res.send('Hello Files!');
}

module.exports = {
    listFiles,
    helpers: {
        bytes,
        strip_filename,
        strip_filetype
    }
}
