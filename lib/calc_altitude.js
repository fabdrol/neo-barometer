/*
 * Altitude (approx.) 
 * 
 * P0 = 1013.25 = Pressure at sea level (by definition)
 * P = Atmospheric pressure
 * T = Temperature
 * h = ( ( ( Math.pow( ( P0 / P ), ( 1/5.257 ) ) ) - 1 ) * ( T + 273.15 ) ) / 0.0065
*/

module.exports = function(P, T) {
  var P0 = 1013.25;
  return ( ( ( Math.pow( ( P0 / P ), ( 1/5.257 ) ) ) - 1 ) * ( T + 273.15 ) ) / 0.0065;
}