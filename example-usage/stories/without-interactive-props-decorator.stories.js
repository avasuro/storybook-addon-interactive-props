import React from 'react';
import {storiesOf} from '@storybook/react';
import {Welcome} from '@storybook/react/demo';

storiesOf('Without "withInteractiveProps" decorator', module)
    .add('without "interactiveProps" config', () => <Welcome />);
