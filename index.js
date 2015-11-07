(function() {
  'use strict';

  let exec = require('child_process').execSync;

  let commands = {
    temp_raw: 'cat /sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_temp_raw',
    temp_scale: 'cat /sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_temp_scale',
    pres_raw: 'cat /sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_pressure_raw',
    pres_scale: 'cat /sys/class/i2c-dev/i2c-1/device/1-0060/iio\:device0/in_pressure_scale'
  };

  function poll() {
    try {
      console.log('Raw temp: ' + exec(commands.temp_raw));
      console.log('Scale temp: ' + exec(commands.temp_scale));
      console.log('Raw pressure: ' + exec(commands.pres_raw));
      console.log('Scale pressure: ' + exec(commands.pres_scale));
    } catch(e) {}
  }

  setInterval(poll, 1000);
})();