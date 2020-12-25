'use strict';

exports.__esModule = true;
exports.default = validate;

var _toNumber = require('lodash/toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(value, context) {
  var constraint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var input = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if ((0, _utils.isEmpty)(input.value)) return true;

  var min = (0, _toNumber2.default)(constraint.value);

  return !isNaN(min) && isFinite(min) && !(0, _utils.isDecimal)(min) && min <= input.value.length || constraint.errorMessage || false;
}