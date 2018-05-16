
# 3D Printer Host (Node)

**A simple 3D printer host written in Node.JS**

The goal of this project is to provide a simple 3D printer host to run on low-powered embedded hardware like the Onion Omega2.  It is intended to be used on a single printer and to not match functionality of established offerings like OctoPrint or Repetier Server.  In practical terms, that means no user management, on-board slicing, gcode simulation, model rendering or other interface fanciness.  The primary features are basic remote file management, print control and status monitoring.

## Installation

It should be as simple as:

    git clone git@github.com:stuartm2/node-3dprinter-host.git
    cd node-3dprinter-host
    npm install

## Usage

Start the server with node:

    node app.js

Then browse to the URL reported in the terminal.

## Docker Image

An automated build of the Docker image is available at [stuartm2/node-3dprinter-host](https://hub.docker.com/r/stuartm2/node-3dprinter-host/).  Run it with Docker:

    docker run -d -p 3000:3000 -v /path/to/gcode/:/gcode/ -e GCODEDIR=/gcode/ stuartm2/node-3dprinter-host

Or with docker-compose:

    version: '3'
    services:
        3dhost:
            image: stuartm2/node-3dprinter-host
            volumes:
                - "/path/to/gcode/:/gcode/"
            ports:
                - "3000:3000"
            environment:
                GCODEDIR: "/gcode/"
        [...]

Note that the Docker image has been assembled for testing purposes only and that the SerialPort library doesn't currently compile for it (I might get round to changing the base image to resolve this one day).  Nor will serial communications work between Docker For Mac/Win and the host system, so only Linux and docker-machine users will be able to use it properly even when that issue is resolved.
