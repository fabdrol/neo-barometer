(function() {
  'use strict';

  let Bluebird  = require('bluebird');
  let fs        = Bluebird.promisifyAll(require('fs'));
  let debug     = require('debug')('neo-barometer');
  let Readable  = require('stream').Readable;
  let util      = require('util');
  let files     = require('../files.json');
  let calc_a    = require('./calc_altitude');
  let calc_sl_p = require('./calc_sl_pressure');

  function Weather() {
    if (!(this instanceof Weather)) {
      return new Weather();
    }

    Readable.call(this, { objectMode: true });
  }

  util.inherits(Weather, Readable);
  module.exports = Weather;

  Weather.prototype._read = function() {
    let pres_scale = 0;
    let temp_scale = 0;
    let temperature = 0;
    let pressure = 0;
    let altitude = 0;
    let sl_pressure = 0;
    
    fs.readFileAsync(files.pres_scale, 'utf8')
      .then((s) => {
        pres_scale = s;
        return fs.readFileAsync(files.pres_raw, 'utf8');
      })
      .then((raw) => {
        pressure = (raw * pres_scale) * 10;
        return fs.readFileAsync(files.temp_scale, 'utf8');
      })
      .then((s) => {
        temp_scale = s;
        return fs.readFileAsync(files.temp_raw, 'utf8');
      })
      .then((raw) => {
        temperature = (raw * temp_scale);
        altitude = calc_a(pressure, temperature);
        sl_pressure = calc_sl_p(pressure, temperature, altitude);
        
        this.push({
          sl_pressure: sl_pressure
        });
      })
      .catch((err) => {
        this.emit('error', err);
      })
    ;
  };

})();