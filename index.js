#!/bin/nodejs

// Sorry, this is ugly, and I didn't have time to prettyfy it

// Enable User Input
process.stdin.resume();

// Figure out what mac addresses we are playing with
var macs = process.argv.slice(2);

// Initialize some variables
var monitors = [];
var path, node_ssh, ssh, fs
fs = require('fs')
path = require('path')
var Client = require('ssh2').Client;
var conn = new Client();
var headers = false;


//Connect up to the server
conn.on('ready', function() {

  // Once connected, let us know
  console.log('Client :: ready');

  // Now iterate over the mac addresses to monitor
  macs.forEach(function(mac) {
    var monitor = {
      mac:mac
    };

    // Create a virtual shell for the command to run in
    monitor.spawn = conn.shell(function(err, stream) {

      // Enter the monitoring command
      stream.write('sudo -u cmx /opt/cmx/bin/cmxloc monitor --mac ' + mac + '\r');

      // If something goes wrong, abort!
      if (err) throw err;


      stream.on('close', function(code, signal) {

        // Once the command exits (in this case would be in error) let us know
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();

      }).on('data', function(data) {

        // We want to log the data into the monitor.data variable
        monitor.data = data.toString();

        // If this is the first log, let the user know that the connection is hot
        if (!monitor.ready) {
          console.log("Ready: " + mac);
          monitor.ready = true;
        }

      }).stderr.on('data', function(data) {
        // Log any errors spit out
        console.log('STDERR: ' + data);
      });

    });


    // Append the newly made monitor object to the monitors array
    monitors.push(monitor)
  })

}).connect({

  // Connection properties go here
  host: '20.10.1.9',
  username: 'cmxadmin',
  password: 'Cisco123'

});


// Watch for user input (enter)
process.stdin.on('data', function(chunk) {

  // If this is the first return entered, spit out headers so we know what order
  // the devices are in
  if (!headers) {
    headers = true;
    console.log(monitors.map(function(monitor) {
      return monitor.mac;
    }).join(","));
  }

  // Initialize locations array
  var locs = [];

  // Now we iterate over the monitor objects
  monitors.forEach(function(monitor) {

    if (!monitor.data) return;

    // Split up the array by space+
    t = monitor.data.split(/\s+/);

    // Get the second and third parts of the data (x and y) as the "first" item
    // is index 0, we use 1 and 2
    // Ex: 2018-02-28T18:24:22.507-0500   129.2      108.01     System Campus>Req-02>Floor 1
    locs.push(t[1]);
    locs.push(t[2]);
  })

  // Join up the array using a comma.  Change this to whatever you want.
  // Newline is \n and Tab is: \t
  process.stdout.write(locs.join(","));

});
