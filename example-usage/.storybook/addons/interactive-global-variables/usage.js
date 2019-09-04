import {getUsageAPI} from 'storybook-addon-interactive-props/dist/dynamic/usage';
import {ADDON_ID} from './shared';

const baseInteractiveAPI = getUsageAPI(ADDON_ID);
export const withGlobalVars = baseInteractiveAPI.decorator;
export const getGlobalVar = baseInteractiveAPI.propGetter;
