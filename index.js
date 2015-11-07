(function() {
  'use strict';

  let Bluebird = require('bluebird');
  let fs = Bluebird.promisifyAll(require('fs'));
  let debug = require('debug')('neo-barometer');
  let RStream = require('stream').Readable;

  let files = {
    temp_raw: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_temp_raw',
    temp_scale: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_temp_scale',
    pres_raw: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_pressure_raw',
    pres_scale: '/sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_pressure_scale'
  };

  function poll() {
    return new Bluebird((accept, reject) => {
      let temperature = { scale: -1, raw: -1, value: -1 };
      let pressure = { scale: -1, raw: -1, value: -1 };

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
          pressure.value = (pressure.raw * pressure.scale);
          temperature.value = (temperature.raw * temperature.scale);
          accept({ pressure, temperature });
        })

        .catch((err) => {
          reject(err);
        })
      ;
    });
  }

  setInterval(() => {
    poll().then((data) => {
      debug('Pressure: ' + data.pressure.value);
      debug('Temperature: ' + data.temperature.value);
    });
  }, 1000);
})();