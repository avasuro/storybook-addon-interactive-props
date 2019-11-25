"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsageAPI = getUsageAPI;

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _objectPath = _interopRequireDefault(require("object-path"));

var _schemasaurus = _interopRequireDefault(require("schemasaurus"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _rfdc = _interopRequireDefault(require("rfdc"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

var _shared = require("../shared");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns API & classes to work with some specific addon instance
 * @param {string} addonId
 * @returns {{decorator, propGetter}}
 */
function getUsageAPI(addonId) {
  if (!addonId || typeof addonId !== 'string') {
    throw new TypeError('Addon ID is required and should be a string');
  }

  var SHARED = (0, _shared.constantsBuilder)(addonId);
  var PARAM_KEY = SHARED.PARAM_KEY,
      CHANGE = SHARED.CHANGE,
      SET_OPTIONS = SHARED.SET_OPTIONS,
      COPY_JSON = SHARED.COPY_JSON;
  var props = {};
  var schema = null;

  function propGetter(path, defaultValue) {
    return _objectPath.default.get(props, path, defaultValue);
  }

  var decorator = (0, _addons.makeDecorator)({
    name: "with".concat(addonId),
    parameterName: PARAM_KEY,
    skipIfNoParametersOrOptions: true,
    allowDeprecatedUsage: true,
    wrapper: function wrapper(getStory, context, _ref) {
      var id = _ref.id,
          options = _ref.options,
          parameters = _ref.parameters;
      var allOptions = parameters || options || {};

      var channel = _addons.default.getChannel();

      channel.emit(_coreEvents.REGISTER_SUBSCRIPTION, function () {
        function onPropsChanged(newProps) {
          if (!(0, _fastDeepEqual.default)(props, newProps)) {
            props = newProps;
            channel.emit(_coreEvents.FORCE_RE_RENDER);
          }
        }

        function jsonGetter(_ref2) {
          var omitDefaultProps = _ref2.omitDefaultProps;
          var result = (0, _rfdc.default)({
            proto: false,
            circles: false
          })(props);

          if (omitDefaultProps && schema) {
            var compilator = _schemasaurus.default.compile(schema, function () {
              return {
                '[default]': function handleItemWithDefaultValue(itemSchema, itemValue, ctx) {
                  if (_typeof(itemSchema.default) === 'object' && itemSchema.default !== null && (0, _fastDeepEqual.default)(itemSchema.default, itemValue)) {
                    _objectPath.default.del(result, ctx.path);
                  } else if (itemSchema.default === itemValue) {
                    _objectPath.default.del(result, ctx.path);
                  }
                }
              };
            }); // Here we use "props" instead of "result" because they
            // have absolutely the same structure, and changes in result
            // will not affect compilation process:


            compilator(props);
            (0, _copyToClipboard.default)(JSON.stringify(result, null, 2), {
              debug: true
            });
          }

          return result;
        }

        channel.on(CHANGE, onPropsChanged);
        channel.on(COPY_JSON, jsonGetter);
        return function disconnectCallbacks() {
          channel.removeListener(CHANGE, onPropsChanged);
          channel.removeListener(COPY_JSON, jsonGetter);
        };
      });
      schema = allOptions.schema || null;

      _addons.default.getChannel().emit(SET_OPTIONS, {
        storyId: id,
        initialProps: allOptions.initialProps,
        schema: allOptions.schema,
        uischema: allOptions.uischema
      });

      return getStory(context);
    }
  });
  return {
    propGetter: propGetter,
    decorator: decorator
  };
}