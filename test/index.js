(function() {
  'use strict';

  var temp = new require('../').Temperature();
  var pres = new require('../').Pressure();
  var alti = new require('../').Altitude();
  var comp = new require('../').Compound();
  var weat = new require('../').Weather();

  temp.on('data', (value) => {
    console.log('Temperature: ' + value);
  });

  pres.on('data', (value) => {
    console.log('Pressure: ' + value);
  });

  alti.on('data', (value) => {
    console.log('Altitude: ' + value);
  });

  comp.on('data', (value) => {
    console.log('Compound:', value);
  });

  weat.on('data', (value) => {
    console.log('Weather:', value);
  });

  function handleError(err) {
    console.error(err.message);
  }

  pres.on('error', handleError);
  temp.on('error', handleError);
  alti.on('error', handleError);
  comp.on('error', handleError);
  weat.on('error', handleError);
})();