// Base ID of addon:
export const BASE_ADDON_ID = 'interactiveProps';

/**
 * Shared constants builder (used by addons, panels and events to get unique names using a prefix)
 * @param {string} addonId
 * @returns {object}
 */
export function constantsBuilder(addonId) {
    const PARAM_KEY = addonId;
    const ADDON_ID = `storybookjs/${PARAM_KEY}`;
    return {
        // Key that will be used to provide config for json form:
        PARAM_KEY,
        // Just an addon-id:
        ADDON_ID,
        // ID of panel to register:
        PANEL_ID: `${ADDON_ID}/panel`,
        // Name of event that will be fired when user changes something in form:
        CHANGE: `${ADDON_ID}/change`,
        // Name of event that will be fired once new options are provided for form (from story):
        SET_OPTIONS: `${ADDON_ID}/set-options`,
        // Name of event that will be fired once user requested copy of JSON:
        COPY_JSON: `${ADDON_ID}/copy-json`
    };
}
