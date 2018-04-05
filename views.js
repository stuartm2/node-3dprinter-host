
const fs = require('fs');
const _ = require('lodash');
const qs = require('querystring');
const shared = require('./static/shared.js');

const BASEDIR = '/Users/stuartm/Downloads/Print Queue/';

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

function addFile(req, res) {
    var file = req.files.file;

    if (shared.isGCodeFile(file.name)) {
        file.mv(`${BASEDIR}${file.name}`);
        res.redirect('/files/' + qs.escape(file.name) + '/info');
    } else {
        res.status(500).send('Upload error');
    }
}

function getFile(req, res) {
    var filename = req.params.file.split('/').pop();
    var filestats = getFileInfo(filename);

    if (filestats) {
        res.json(filestats);
    } else {
        res.status(404).send('File not found');
    }
}

function getFileInfo(filename) {
    if (fs.existsSync(BASEDIR + filename)) {
        var stats = fs.statSync(BASEDIR + filename);

        if (!_.startsWith(filename, '.') && !stats.isDirectory()) {
            return {
                name: filename,
                size: stats.size
            };
        }
    }
}

function getFileRow(req, res) {
    var filename = req.params.file.split('/').pop();
    var filestats = getFileInfo(filename);

    if (filestats) {
        res.render('partials/filerow', _.extend(filestats, {layout: false}));
    } else {
        res.status(404).send('File not found');
    }
}

function deleteFile(req, res) {
    var filename = req.params.file.split('/').pop();

    if (fs.existsSync(BASEDIR + filename)) {
        fs.unlink(BASEDIR + filename, (err) => {
            if (err) {
                res.status(403).send('Permission denied');
            } else {
                res.send('OK');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
}

function listFiles(req, res) {
    var files = [];

    fs.readdirSync(BASEDIR).forEach(function (f) {
        var filestats = getFileInfo(f);

        if (filestats) {
            files.push(filestats);
        }
    });

    return res.render('files', {
        files
    });
}

module.exports = {
    addFile,
    getFile,
    getFileRow,
    deleteFile,
    listFiles,
    helpers: {
        bytes,
        escape: qs.escape,
        strip_filename: shared.strip_filename,
        strip_filetype
    }
}
