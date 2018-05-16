
var fs = require('fs');
var LineByLineReader = require('line-by-line');
var SerialPort = require('serialport');

function print(file, opts) {
    if (fs.existsSync(file)) {
        streamToPrinter(
            new LineByLineReader(file),
            new SerialPort(opts.port, { baudRate: opts.baudRate })
        );
    } else {
        console.log(`Error: ${file} not found`);
    }
}

function streamToPrinter(gCodeStream, printer) {
    gCodeStream.pause();

    printer.on('open', () => {
        console.log('Connected to printer');

        gCodeStream.on('error', (err) => {
            // 'err' contains error object
        });

        gCodeStream.on('line', (line) => {
            console.log('> ' + line);
            line = line.split(';')[0].trim(); // Strip comments and whitespace

            if (line.length > 0) {
                printer.write(line + '\n');
                gCodeStream.pause();
            }
        });

        gCodeStream.on('end', () => {
            printer.drain();
            console.log('Print finished');
            // node serialport lib bug preventing port closure?
            // printer.close((err) => console.log(`Error:  ${err}`));
        });
    });

    printer.on('data', (data) => {
        var resp = data.toString().trim();

        if (resp.length >= 5 && resp.slice(0, 5) == 'start') {
            setTimeout(() => gCodeStream.resume(), 250);
        } else if (resp == 'ok') {
            gCodeStream.resume();
        }
    });
}

module.exports = {
    print
}
