(function() {
  'use strict';

  let Bluebird  = require('bluebird');
  let fs        = Bluebird.promisifyAll(require('fs'));
  let debug     = require('debug')('neo-barometer');
  let Readable  = require('stream').Readable;
  let util      = require('util');
  let files     = require('../files.json');

  function Pressure() {
    if (!(this instanceof Pressure)) {
      return new Pressure();
    }

    Readable.call(this, { objectMode: true });
  }

  util.inherits(Pressure, Readable);
  module.exports = Pressure;

  Pressure.prototype._read = function() {
    let scale = 0;
    
    fs.readFileAsync(files.pres_scale, 'utf8')
      .then((s) => {
        scale = s;
        return fs.readFileAsync(files.pres_raw, 'utf8');
      })
      .then((raw) => {
        this.push((raw * scale));
      })
      .catch((err) => {
        this.emit('error', err);
      })
    ;
  };

})();