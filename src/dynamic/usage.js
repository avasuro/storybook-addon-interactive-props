import equal from 'fast-deep-equal';
import objectPath from 'object-path';
import schemasaurus from 'schemasaurus';
import copy from 'copy-to-clipboard';
import addons, {makeDecorator} from '@storybook/addons';
import {FORCE_RE_RENDER, REGISTER_SUBSCRIPTION} from '@storybook/core-events';
import {constantsBuilder} from '../shared';

/**
 * Returns API & classes to work with some specific addon instance
 * @param {string} addonId
 * @returns {{decorator, propGetter}}
 */
function getUsageAPI(addonId) {
    if (!addonId || typeof addonId !== 'string') {
        throw new TypeError('Addon ID is required and should be a string');
    }

    const SHARED = constantsBuilder(addonId);
    const {PARAM_KEY, CHANGE, SET_OPTIONS, COPY_JSON} = SHARED;

    let props = {};
    let schema = null;
    function propGetter(path, defaultValue) {
        return objectPath.get(props, path, defaultValue);
    }

    const decorator = makeDecorator({
        name: `with${addonId}`,
        parameterName: PARAM_KEY,
        skipIfNoParametersOrOptions: true,
        allowDeprecatedUsage: true,
        wrapper: (getStory, context, {id, options, parameters}) => {
            const allOptions = parameters || options || {};
            const channel = addons.getChannel();

            channel.emit(REGISTER_SUBSCRIPTION, () => {
                function onPropsChanged(newProps) {
                    if (!equal(props, newProps)) {
                        props = newProps;
                        channel.emit(FORCE_RE_RENDER);
                    }
                }

                function jsonGetter({omitDefaultProps}) {
                    // TODO: may be invent better approach to make deep copy of object:
                    const result = JSON.parse(JSON.stringify(props));
                    if (omitDefaultProps && schema) {
                        let compilator = schemasaurus.compile(schema, () => ({
                            '[default]': function handleItemWithDefaultValue(itemSchema, itemValue, ctx) {
                                if (
                                    typeof itemSchema.default === 'object' &&
                                    itemSchema.default !== null &&
                                    equal(itemSchema.default, itemValue)
                                ) {
                                    objectPath.del(result, ctx.path);
                                }
                                else if (itemSchema.default === itemValue) {
                                    objectPath.del(result, ctx.path);
                                }
                            }
                        }));

                        // Here we use "props" instead of "result" because they
                        // have absolutely the same structure, and changes in result
                        // will not affect compilation process:
                        compilator(props);

                        copy(JSON.stringify(result, null, 2), {
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
            addons.getChannel().emit(SET_OPTIONS, {
                storyId: id,
                initialProps: allOptions.initialProps,
                schema: allOptions.schema,
                uischema: allOptions.uischema
            });

            return getStory(context);
        }
    });

    return {
        propGetter,
        decorator
    };
}

export {
    // eslint-disable-next-line import/prefer-default-export
    getUsageAPI
};
