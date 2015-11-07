/*
 * P0 = P * Math.pow((1 - ( (0.0065 * h) / (T + (0.0065 * h) + 273.15) ) ), -5.257)
 */

module.exports = function(P, T, h) {
  return P * Math.pow((1 - ( (0.0065 * h) / (T + (0.0065 * h) + 273.15) ) ), -5.257);
};