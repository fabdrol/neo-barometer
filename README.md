# neo-barometer

Node.js module for retrieving data from the barometer brick for the UDOO Neo. 
Gets atmospheric pressure in pascals, temperature in kelvin and altitude in meters. 

A note on altitude: the value is derived from measured temperature, measured atmospheric pressure and 
a fixed atmospheric pressure at sea level (`P0`, 1013.25 hPa). `P0` could be different at your location, so the calculed
altitude might not be accurate. 

**Important: this modules uses ES2015 (ES6) features, so use a modern version of node.js (v4.x, v5.x etc)**


## Installation

```javascript
npm install --save neo-barometer
```


## Usage

The module exports four Readable Streams:
- `barometer.Temperature`: a stream of temperature values in degrees celcius.
- `barometer.Pressure`: a stream of atmospheric pressure values in pascals.
- `barometer.Altitude`: a stream of altitude values in meters.
- `barometer.Compound`: a stream of objects that contain all three values (temperature, pressure & altitude).

```javascript
let barometer = require('neo-barometer');

// 1. Just temperature
let temperature = new barometer.Temperature();
temperature.on('data', console.log.bind(console));
temperature.on('error', console.error.bind(console));

// 2. Just pressure 
let pressure = new barometer.Pressure();
pressure.on('data', console.log.bind(console));
pressure.on('error', console.error.bind(console));

// 3. Just altitude
let altitude = new barometer.Altitude();
altitude.on('data', console.log.bind(console));
altitude.on('error', console.error.bind(console));

// 4. Compound (all values)
let compound = new barometer.Compound();
compound.on('data', console.log.bind(console));
compound.on('error', console.error.bind(console));
```