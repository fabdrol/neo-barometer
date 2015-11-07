(function() {
  'use strict';
  
  let Bluebird = require('bluebird');
  let fs = Bluebird.promisifyAll(require('fs'));

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
        temperature.scale = scale;
        return fs.readFileAsync(files.pres_scale, 'utf8');
      })
      .then((scale) => {
        pressure.scale = scale;
        return fs.readFileAsync(files.temp_raw, 'utf8');
      })
      .then((raw) => {
        temperature.raw = raw;
        return fs.readFileAsync(files.pres_raw, 'utf8');
      })
      .then((raw) => {
        pressure.raw = raw;
        debug('Temperature: ' + (temperature.raw * temperature.scale));
        debug('Pressure: ' + (pressure.raw * pressure.scale));
      })

      .catch((err) => {
        debug('Error:', err.message);
      })
    ;
  }

  setInterval(poll, 1000);
})();