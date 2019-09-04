"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _InteractivePropsForm = _interopRequireDefault(require("../components/InteractivePropsForm"));

var _shared = require("../shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register(_ref) {
  var id = _ref.id,
      title = _ref.title;

  if (!title || typeof title !== 'string') {
    throw new TypeError('Title required, and should be a string');
  }

  if (!id || typeof id !== 'string') {
    throw new TypeError('Id required, and should be a string');
  }

  var SHARED = (0, _shared.constantsBuilder)(id);

  _addons.default.register(SHARED.ADDON_ID, function (api) {
    _addons.default.addPanel(SHARED.PANEL_ID, {
      title: title,
      // eslint-disable-next-line react/prop-types
      render: function render(_ref2) {
        var active = _ref2.active,
            key = _ref2.key;
        return _react.default.createElement(_InteractivePropsForm.default, {
          api: api,
          key: key,
          active: active !== undefined ? active : false,
          shared: SHARED
        });
      },
      paramKey: SHARED.PARAM_KEY
    });
  });
}