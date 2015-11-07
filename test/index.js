(function() {
  'use strict';

  var temp = new require('../').Temperature();
  var pres = new require('../').Pressure();

  temp.on('data', (value) => {
    console.log('Temperature: ' + value);
  });

  pres.on('data', (value) => {
    console.log('Pressure: ' + value);
  });

  function handleError(err) {
    console.error(err.message);
  }

  pres.on('error', handleError);
  temp.on('error', handleError);
})();