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
      let temperature = (exec(commands.temp_raw) * exec(commands.temp_scale));
      let pressure = (exec(commands.pres_raw) * exec(commands.pres_scale));

      console.log('Temperature: ' + temperature);
      console.log('Pressure: ' + pressure);
    } catch(e) {}
  }

  setInterval(poll, 1000);
})();