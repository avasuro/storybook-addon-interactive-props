"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantsBuilder = constantsBuilder;
exports.BASE_ADDON_ID = void 0;
// Base ID of addon:
var BASE_ADDON_ID = 'interactiveProps';
/**
 * Shared constants builder (used by addons, panels and events to get unique names using a prefix)
 * @param {string} addonId
 * @returns {object}
 */

exports.BASE_ADDON_ID = BASE_ADDON_ID;

function constantsBuilder(addonId) {
  var PARAM_KEY = addonId;
  var ADDON_ID = "storybookjs/".concat(PARAM_KEY);
  return {
    // Key that will be used to provide config for json form:
    PARAM_KEY: PARAM_KEY,
    // Just an addon-id:
    ADDON_ID: ADDON_ID,
    // ID of panel to register:
    PANEL_ID: "".concat(ADDON_ID, "/panel"),
    // Name of event that will be fired when user changes something in form:
    CHANGE: "".concat(ADDON_ID, "/change"),
    // Name of event that will be fired once new options are provided for form (from story):
    SET_OPTIONS: "".concat(ADDON_ID, "/set-options"),
    // Name of event that will be fired once user requested copy of JSON:
    COPY_JSON: "".concat(ADDON_ID, "/copy-json")
  };
}