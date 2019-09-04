import React from 'react';
import {storiesOf} from '@storybook/react';
import {Button} from '@storybook/react/demo';
import {action} from '@storybook/addon-actions';
import {getGlobalVar, withGlobalVars} from '../.storybook/addons/interactive-global-variables/usage';

storiesOf('Using custom interactive prop instance', module)
    .addDecorator(withGlobalVars)
    .add('example of usage', () => (
        <Button onClick={action('clicked')}>{getGlobalVar('globalButtonLabel')}</Button>
    ), {
        interactiveGlobalVars: {
            initialProps: {
                globalButtonLabel: 'Click me!'
            }
        }
    });
