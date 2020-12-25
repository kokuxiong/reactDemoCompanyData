'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _reactstrap = require('reactstrap');

var _AvInput = require('./AvInput');

var _AvInput2 = _interopRequireDefault(_AvInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkPropTypes = (0, _assign2.default)({}, _AvInput2.default.propTypes, { customInput: _propTypes2.default.bool });
delete checkPropTypes.name;

var AvCheckbox = function (_Component) {
  (0, _inherits3.default)(AvCheckbox, _Component);

  function AvCheckbox() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AvCheckbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AvCheckbox.prototype.componentDidMount = function componentDidMount() {
    this.context.FormCtrl && this.context.FormCtrl.register(this);
  };

  AvCheckbox.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.FormCtrl && this.context.FormCtrl.unregister(this);
  };

  AvCheckbox.prototype.isDefaultChecked = function isDefaultChecked(valueArr) {
    var _this2 = this;

    return Array.isArray(valueArr) && valueArr.length > 0 && (0, _find2.default)(valueArr, function (item) {
      return item === _this2.props.value;
    });
  };

  AvCheckbox.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        id = _props.id,
        customInput = _props.customInput,
        attributes = (0, _objectWithoutProperties3.default)(_props, ['className', 'id', 'customInput']);


    var groupProps = this.context.Group.getProps();

    var touched = this.context.FormCtrl.isTouched(groupProps.name);
    var hasError = this.context.FormCtrl.hasError(groupProps.name);

    var classes = (0, _classnames2.default)(className, touched ? 'is-touched' : 'is-untouched', this.context.FormCtrl.isDirty(groupProps.name) ? 'is-dirty' : 'is-pristine', this.context.FormCtrl.isBad(groupProps.name) ? 'is-bad-input' : null, hasError ? 'av-invalid' : 'av-valid', touched && hasError && 'is-invalid');

    if (this.props.disabled === undefined && this.context.FormCtrl.isDisabled() !== undefined) {
      attributes.disabled = this.context.FormCtrl.isDisabled();
    }

    if (this.props.readOnly === undefined && this.context.FormCtrl.isReadOnly() !== undefined) {
      attributes.disabled = attributes.disabled || this.context.FormCtrl.isReadOnly();
    }

    if (customInput) {
      return _react2.default.createElement(_reactstrap.CustomInput, (0, _extends3.default)({
        name: groupProps.name,
        type: 'checkbox'
      }, attributes, {
        inline: groupProps.inline,
        id: id || 'checkbox-' + groupProps.name + '-' + this.props.value,
        className: classes,
        onChange: this.onChangeHandler,
        value: this.props.value && this.props.value.toString(),
        defaultChecked: this.isDefaultChecked(groupProps.value),
        required: groupProps.required,
        label: this.props.label
      }));
    }

    return _react2.default.createElement(
      _reactstrap.FormGroup,
      { check: true, inline: groupProps.inline, disabled: attributes.disabled || attributes.readOnly },
      _react2.default.createElement(_reactstrap.Input, (0, _extends3.default)({
        name: groupProps.name,
        type: 'checkbox'
      }, attributes, {
        id: id || 'checkbox-' + groupProps.name + '-' + this.props.value,
        className: classes,
        onChange: this.onChangeHandler,
        value: this.props.value && this.props.value.toString(),
        defaultChecked: this.isDefaultChecked(groupProps.value),
        required: groupProps.required
      })),
      _react2.default.createElement(
        _reactstrap.Label,
        { check: true, 'for': id || 'checkbox-' + groupProps.name + '-' + this.props.value },
        this.props.label
      )
    );
  };

  return AvCheckbox;
}(_react.Component);

AvCheckbox.contextTypes = (0, _assign2.default)({}, _AvInput2.default.contextTypes, {
  Group: _propTypes2.default.object.isRequired
});
AvCheckbox.propTypes = checkPropTypes;

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChangeHandler = function (event) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    _this3.context.Group.update(event, _this3.props.value);
    if (_this3.props.onChange) {
      var _props2;

      (_props2 = _this3.props).onChange.apply(_props2, [event].concat(args));
    }
  };
};

exports.default = AvCheckbox;