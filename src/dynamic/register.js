import React from 'react';
import addons from '@storybook/addons';
import InteractivePropsForm from '../components/InteractivePropsForm';
import {constantsBuilder} from '../shared';

function register({id, title}) {
    if (!title || typeof title !== 'string') {
        throw new TypeError('Title required, and should be a string');
    }
    if (!id || typeof id !== 'string') {
        throw new TypeError('Id required, and should be a string');
    }
    const SHARED = constantsBuilder(id);

    addons.register(SHARED.ADDON_ID, (api) => {
        addons.addPanel(SHARED.PANEL_ID, {
            title,
            // eslint-disable-next-line react/prop-types
            render: ({active, key}) => (
                <InteractivePropsForm
                    api={api}
                    key={key}
                    active={active !== undefined ? active : false}
                    shared={SHARED}
                />
            ),
            paramKey: SHARED.PARAM_KEY
        });
    });
}

export {
    // eslint-disable-next-line import/prefer-default-export
    register
};
