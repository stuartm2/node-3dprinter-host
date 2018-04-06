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
