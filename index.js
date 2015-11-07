(function() {
  'use strict';

  let fs = Bluebird.promisifyAll(require('fs'));
  let Bluebird = require('bluebird');

  let files = {
    temp_raw: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_temp_raw',
    temp_scale: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_temp_scale',
    pres_raw: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_pressure_raw',
    pres_scale: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_pressure_scale'
  };

  function poll() {
    let temperature = { scale: 0, raw: 0 };
    let pressure = { scale: 0, raw: 0 };

    fs
      .readFileAsync(files.temp_scale, 'utf8')
      .then((scale) => {
        console.log('Temperature scale:', typeof scale, scale);
        return fs.readFileAsync(files.pres_scale, 'utf8');
      })
      .then((scale) => {
        console.log('Pressure scale:', typeof scale, scale);
      })
    ;
  }

  setInterval(poll, 1000);
})();