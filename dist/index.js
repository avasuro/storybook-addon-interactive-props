"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInteractiveProp = exports.withInteractiveProps = void 0;

var _usage = require("./dynamic/usage");

var _shared = require("./shared");

var baseInteractiveAPI = (0, _usage.getUsageAPI)(_shared.BASE_ADDON_ID);
var withInteractiveProps = baseInteractiveAPI.decorator;
exports.withInteractiveProps = withInteractiveProps;
var getInteractiveProp = baseInteractiveAPI.propGetter;
exports.getInteractiveProp = getInteractiveProp;