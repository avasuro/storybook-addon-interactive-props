"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _coreEvents = require("@storybook/core-events");

var _react2 = require("@jsonforms/react");

var _core = require("@jsonforms/core");

var _materialRenderers = require("@jsonforms/material-renderers");

var _rfdc = _interopRequireDefault(require("rfdc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelWrapper = (0, _theming.styled)(function (_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react.default.createElement(_components.ScrollArea, {
    horizontal: true,
    vertical: true,
    className: className
  }, children);
})({
  height: '100%',
  width: '100%'
});

var InteractivePropsForm =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InteractivePropsForm, _PureComponent);

  function InteractivePropsForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InteractivePropsForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InteractivePropsForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "store", (0, _redux.createStore)((0, _redux.combineReducers)({
      jsonforms: (0, _core.jsonformsReducer)()
    }), {
      jsonforms: {
        cells: _materialRenderers.materialCells,
        renderers: _materialRenderers.materialRenderers
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "lastSetOptions", null);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isNoInteractivePropertiesFound: true
    });

    _defineProperty(_assertThisInitialized(_this), "onStoryChanged", function () {
      // When story changed - simulate set empty options to reset store and rerender form.
      // This is important when user switches from story, where "withInteractiveProps" decorator
      // used, to story where this decorator not used (because if we remove the following line -
      // no rerender will be performed and there will be old form from previous story displayed
      // in add-ons panel):
      _this.onOptionsSet({});
    });

    _defineProperty(_assertThisInitialized(_this), "onStoreChange", function () {
      var _this$props = _this.props,
          api = _this$props.api,
          shared = _this$props.shared;
      api.emit(shared.CHANGE, _this.store.getState().jsonforms.core.data);

      _this.setState({
        isNoInteractivePropertiesFound: !_this.store.getState().jsonforms.core.uischema || _this.store.getState().jsonforms.core.uischema.elements && _this.store.getState().jsonforms.core.uischema.elements.length === 0
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onOptionsSet", function (options) {
      if (!(0, _fastDeepEqual.default)(_this.lastSetOptions, options)) {
        // We have to make deep copy of options object because in some cases
        // jsonform library mutates deep props in this object, and after such
        // mutations "onOptionsSet" handler may behave improperly:
        _this.lastSetOptions = (0, _rfdc.default)({
          proto: false,
          circles: false
        })(options);

        _this.store.dispatch(_core.Actions.init(options.initialProps || {}, options.schema, options.uischema));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      var options = _this.lastSetOptions;

      _this.store.dispatch(_core.Actions.init(options.initialProps || {}, options.schema, options.uischema));
    });

    _defineProperty(_assertThisInitialized(_this), "copy", function () {
      var _this$props2 = _this.props,
          api = _this$props2.api,
          shared = _this$props2.shared;
      api.emit(shared.COPY_JSON, {
        omitDefaultProps: true
      });
    });

    return _this;
  }

  _createClass(InteractivePropsForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          api = _this$props3.api,
          shared = _this$props3.shared;
      api.on(shared.SET_OPTIONS, this.onOptionsSet);
      api.on(_coreEvents.STORY_CHANGED, this.onStoryChanged);
      this.store.subscribe(this.onStoreChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props4 = this.props,
          api = _this$props4.api,
          shared = _this$props4.shared;
      api.off(shared.SET_OPTIONS, this.onOptionsSet);
      api.off(_coreEvents.STORY_CHANGED, this.onStoryChanged);
      this.store.unsubscribe(this.onStoreChange);
    }
  }, {
    key: "render",
    value: function render() {
      var panelActive = this.props.active;
      var isNoInteractivePropertiesFound = this.state.isNoInteractivePropertiesFound;

      if (!panelActive) {
        return null;
      }

      if (isNoInteractivePropertiesFound) {
        return _react.default.createElement(_components.Placeholder, null, _react.default.createElement(_react.default.Fragment, null, "No interactive properties found"), _react.default.createElement(_react.default.Fragment, null, "Learn how to", ' ', _react.default.createElement(_components.Link, {
          href: "https://github.com/avasuro/storybook-addon-interactive-props",
          target: "_blank",
          withArrow: true
        }, "dynamically interact with components")));
      } // Render panel:


      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(PanelWrapper, null, _react.default.createElement(_reactRedux.Provider, {
        store: this.store
      }, _react.default.createElement(_react2.JsonFormsReduxContext, null, _react.default.createElement(_react2.JsonFormsDispatch, null)))), _react.default.createElement(_components.ActionBar, {
        actionItems: [{
          title: 'Copy JSON',
          onClick: this.copy
        }, {
          title: 'Reset',
          onClick: this.reset
        }]
      }));
    }
  }]);

  return InteractivePropsForm;
}(_react.PureComponent);

exports.default = InteractivePropsForm;
InteractivePropsForm.propTypes = {
  active: _propTypes.default.bool.isRequired,
  shared: _propTypes.default.shape({
    RESET: _propTypes.default.string.isRequired,
    CHANGE: _propTypes.default.string.isRequired,
    SET_OPTIONS: _propTypes.default.string.isRequired,
    COPY_JSON: _propTypes.default.string.isRequired
  }).isRequired,
  api: _propTypes.default.shape({
    on: _propTypes.default.func.isRequired,
    off: _propTypes.default.func.isRequired,
    emit: _propTypes.default.func.isRequired
  }).isRequired
};