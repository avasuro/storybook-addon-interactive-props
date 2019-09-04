import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import equal from 'fast-deep-equal';
import {styled} from '@storybook/theming';
import {Placeholder, ActionBar, Link, ScrollArea} from '@storybook/components';
import {STORY_CHANGED} from '@storybook/core-events';
import {JsonFormsReduxContext, JsonFormsDispatch} from '@jsonforms/react';
import {Actions, jsonformsReducer} from '@jsonforms/core';
import {materialRenderers, materialCells} from '@jsonforms/material-renderers';

const PanelWrapper = styled(({children, className}) => (
    <ScrollArea horizontal vertical className={className}>
        {children}
    </ScrollArea>
))({
    height: '100%',
    width: '100%'
});

export default class InteractivePropsForm extends PureComponent {
    store = createStore(
        combineReducers({
            jsonforms: jsonformsReducer()
        }),
        {
            jsonforms: {
                cells: materialCells,
                renderers: materialRenderers
            }
        }
    );

    lastSetOptions = null;

    state = {
        isNoInteractivePropertiesFound: true
    };


    componentDidMount() {
        const {api, shared} = this.props;
        api.on(shared.SET_OPTIONS, this.onOptionsSet);
        api.on(STORY_CHANGED, this.onStoryChanged);
        this.store.subscribe(this.onStoreChange);
    }

    componentWillUnmount() {
        const {api, shared} = this.props;
        api.off(shared.SET_OPTIONS, this.onOptionsSet);
        api.off(STORY_CHANGED, this.onStoryChanged);
        this.store.unsubscribe(this.onStoreChange);
    }

    onStoryChanged = () => {
        // When story changed - simulate set empty options to reset store and rerender form.
        // This is important when user switches from story, where "withInteractiveProps" decorator
        // used, to story where this decorator not used (because if we remove the following line -
        // no rerender will be performed and there will be old form from previous story displayed
        // in add-ons panel):
        this.onOptionsSet({});
    };

    onStoreChange = () => {
        const {api, shared} = this.props;
        api.emit(shared.CHANGE, this.store.getState().jsonforms.core.data);
        this.setState({
            isNoInteractivePropertiesFound: !this.store.getState().jsonforms.core.uischema || (
                this.store.getState().jsonforms.core.uischema.elements &&
                this.store.getState().jsonforms.core.uischema.elements.length === 0
            )
        });
    };

    onOptionsSet = (options) => {
        if (!equal(this.lastSetOptions, options)) {
            // We have to make deep copy of options object because in some cases
            // jsonform library mutates deep props in this object, and after such
            // mutations "onOptionsSet" handler may behave improperly:
            this.lastSetOptions = JSON.parse(JSON.stringify(options));
            this.store.dispatch(
                Actions.init(options.initialProps || {}, options.schema, options.uischema)
            );
        }
    };

    reset = () => {
        const options = this.lastSetOptions;
        this.store.dispatch(
            Actions.init(options.initialProps || {}, options.schema, options.uischema)
        );
    };

    copy = () => {
        const {api, shared} = this.props;
        api.emit(shared.COPY_JSON, {
            omitDefaultProps: true
        });
    };

    render() {
        const {active: panelActive} = this.props;
        const {isNoInteractivePropertiesFound} = this.state;

        if (!panelActive) {
            return null;
        }

        if (isNoInteractivePropertiesFound) {
            return (
                <Placeholder>
                    <>No interactive properties found</>
                    <>
                        Learn how to
                        {' '}
                        <Link
                            href="https://github.com/avasuro/storybook-addon-interactive-props"
                            target="_blank"
                            withArrow
                        >
                            dynamically interact with components
                        </Link>
                    </>
                </Placeholder>
            );
        }

        // Render panel:
        return (
            <>
                <PanelWrapper>
                    <Provider store={this.store}>
                        <JsonFormsReduxContext>
                            <JsonFormsDispatch />
                        </JsonFormsReduxContext>
                    </Provider>
                </PanelWrapper>
                <ActionBar
                    actionItems={[
                        {title: 'Copy JSON', onClick: this.copy},
                        {title: 'Reset', onClick: this.reset}
                    ]}
                />
            </>
        );
    }
}

InteractivePropsForm.propTypes = {
    active: PropTypes.bool.isRequired,
    shared: PropTypes.shape({
        RESET: PropTypes.string.isRequired,
        CHANGE: PropTypes.string.isRequired,
        SET_OPTIONS: PropTypes.string.isRequired,
        COPY_JSON: PropTypes.string.isRequired
    }).isRequired,
    api: PropTypes.shape({
        on: PropTypes.func.isRequired,
        off: PropTypes.func.isRequired,
        emit: PropTypes.func.isRequired
    }).isRequired
};
