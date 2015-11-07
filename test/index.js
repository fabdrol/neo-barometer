(function() {
  'use strict';

  var debug = require('debug')('neo-barometer-test');

  var temp = new require('../').Temperature();
  var pres = new require('../').Pressure();
  var alti = new require('../').Altitude();
  var comp = new require('../').Compound();

  temp.on('data', (value) => {
    debug('Temperature: ' + value);
  });

  pres.on('data', (value) => {
    debug('Pressure: ' + value);
  });

  alti.on('data', (value) => {
    debug('Altitude: ' + value);
  });

  comp.on('data', (value) => {
    debug('Compound: ' + JSON.stringify(value));
  });

  function handleError(err) {
    debug('Error: ' + err.message);
  }

  pres.on('error', handleError);
  temp.on('error', handleError);
  alti.on('error', handleError);
  comp.on('error', handleError);
})();