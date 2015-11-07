(function() {
  'use strict';

  let Bluebird  = require('bluebird');
  let fs        = Bluebird.promisifyAll(require('fs'));
  let debug     = require('debug')('neo-barometer');
  let Readable  = require('stream').Readable;
  let util      = require('util');
  let files     = require('../files.json');

  function Temperature() {
    if (!(this instanceof Temperature)) {
      return new Temperature();
    }

    Readable.call(this, { objectMode: true });
  }

  util.inherits(Temperature, Readable);
  module.exports = Temperature;

  Temperature.prototype._read = function() {
    let scale = 0;
    
    fs.readFileAsync(files.temp_scale, 'utf8')
      .then((s) => {
        scale = s;
        return fs.readFileAsync(files.temp_raw, 'utf8');
      })
      .then((raw) => {
        this.push((raw * scale));
      })
    ;
  };

})();