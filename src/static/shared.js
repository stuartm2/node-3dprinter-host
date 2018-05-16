
function isGCodeFile(filename) {
    var suffix = strip_filename(filename);
    return suffix === 'GCODE';
}

function strip_filename(val) {
    var i = val.lastIndexOf('.');
    return (i >= 0) ? val.slice(i + 1).toUpperCase() : 'UNKNOWN';
}

try {
    module.exports = {
        isGCodeFile,
        strip_filename
    }
} catch (e) {}
