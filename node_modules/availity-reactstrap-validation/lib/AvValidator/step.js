'use strict';

exports.__esModule = true;
exports.default = validate;

var _toNumber = require('lodash/toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDecCount(val) {
  var valStr = val.toString();
  if (valStr.indexOf('e-') > -1) {
    var valArr = valStr.split('e-');
    return parseInt((valArr[0].split('.')[1] || '').length, 10) + parseInt(valArr[1], 10);
  }
  return (valStr.split('.')[1] || '').length;
}

// http://stackoverflow.com/a/31711034/1873485
function floatSafeRemainder(val, step) {
  var valDecCount = getDecCount(val);
  var stepDecCount = getDecCount(step);
  var decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  var valInt = parseInt(val.toFixed(decCount).replace('.', ''), 10);
  var stepInt = parseInt(step.toFixed(decCount).replace('.', ''), 10);
  return valInt % stepInt / Math.pow(10, decCount);
}

function validate(value, context) {
  var constraint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if ((0, _utils.isEmpty)(value)) return true;

  return floatSafeRemainder((0, _toNumber2.default)(value), (0, _toNumber2.default)(constraint.value)) === 0 || constraint.errorMessage || false;
}