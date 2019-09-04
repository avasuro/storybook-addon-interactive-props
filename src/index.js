import {getUsageAPI} from './dynamic/usage';
import {BASE_ADDON_ID} from './shared';

const baseInteractiveAPI = getUsageAPI(BASE_ADDON_ID);
export const withInteractiveProps = baseInteractiveAPI.decorator;
export const getInteractiveProp = baseInteractiveAPI.propGetter;
