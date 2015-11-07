(function() {
  'use strict';

  let Bluebird  = require('bluebird');
  let fs        = Bluebird.promisifyAll(require('fs'));
  let debug     = require('debug')('neo-barometer');
  let Readable  = require('stream').Readable;
  let util      = require('util');
  let files     = require('../files.json');
  let calc_a    = require('./calc_altitude');

  function Compound() {
    if (!(this instanceof Compound)) {
      return new Compound();
    }

    Readable.call(this, { objectMode: true });
  }

  util.inherits(Compound, Readable);
  module.exports = Compound;

  Compound.prototype._read = function() {
    let pres_scale = 0;
    let temp_scale = 0;
    let temperature = 0;
    let pressure = 0;
    let altitude = 0;
    let P0 = 1013.25;
    
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
        
        this.push({
          altitude: altitude,
          temperature: (temperature + 273.15),
          pressure: (pressure * 100),

          _units: {
            altitude: 'meter',
            temperature: 'kelvin',
            pressure: 'pascal'
          }
        });
      })
      .catch((err) => {
        this.emit('error', err);
      })
    ;
  };

})();