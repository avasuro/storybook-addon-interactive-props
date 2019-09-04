import React from 'react';
import {storiesOf} from '@storybook/react';
import {Button} from '@storybook/react/demo';
import {action} from '@storybook/addon-actions';
import {getInteractiveProp, withInteractiveProps} from 'storybook-addon-interactive-props';

storiesOf('with "withInteractiveProps" decorator', module)
    .addDecorator(withInteractiveProps)
    .add('without "interactiveProps" config', () => <Button>Some button</Button>, {})
    .add('with empty "interactiveProps" config', () => <Button>Some button</Button>, {interactiveProps: {}})
    .add('"initialProps" only', () => (
        <Button onClick={action('clicked')}>{getInteractiveProp('label')}</Button>
    ), {
        interactiveProps: {
            initialProps: {
                label: 'Click me!'
            }
        }
    })
    .add('"schema" only', () => (
        <Button onClick={action('clicked')}>{getInteractiveProp('label')}</Button>
    ), {
        interactiveProps: {
            schema: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string',
                        description: 'Label of the button'
                    }
                }
            }
        }
    })
    .add('"schema" + "initialProps"', () => (
        <Button onClick={action('clicked')}>{getInteractiveProp('label')}</Button>
    ), {
        interactiveProps: {
            initialProps: {
                label: 'Click me!'
            },
            schema: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string',
                        description: 'Label of the button'
                    }
                }
            }
        }
    })
    .add('"schema" + "initialProps" + "uischema"', () => (
        <Button
            onClick={() => action(getInteractiveProp('onClickAction.name'))(getInteractiveProp('onClickAction.arguments'))}
        >
            {getInteractiveProp('buttonConfig.label')}
        </Button>
    ), {
        interactiveProps: {
            initialProps: {
                buttonConfig: {
                    label: 'Some label'
                },
                onClickAction: {
                    name: 'click',
                    arguments: ['argument#1']
                }
            },
            uischema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'Button config',
                        elements: [
                            {type: 'Control', scope: '#/properties/buttonConfig'}
                        ]
                    },
                    {
                        type: 'Category',
                        label: 'Click action config',
                        elements: [
                            {type: 'Control', scope: '#/properties/onClickAction'}
                        ]
                    }
                ]
            },
            schema: {
                type: 'object',
                properties: {
                    buttonConfig: {
                        type: 'object',
                        default: {
                            label: 'Some label'
                        },
                        description: 'Button config',
                        properties: {
                            label: {
                                type: 'string',
                                default: 'Some label',
                                description: 'Label of the button'
                            }
                        }
                    },
                    onClickAction: {
                        type: 'object',
                        description: 'Click action config config',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Name of the action to trigger on click on button'
                            },
                            arguments: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    .add('Copy JSON: makes copy on click on "Copy JSON"', () => (
        <Button
            onClick={() => action(getInteractiveProp('onClickAction.name'))(getInteractiveProp('onClickAction.arguments'))}
        >
            {getInteractiveProp('buttonConfig.label')}
        </Button>
    ), {
        interactiveProps: {
            initialProps: {
                buttonConfig: {
                    label: 'Some label'
                },
                onClickAction: {
                    name: 'click',
                    arguments: ['argument#1']
                }
            },
            schema: {
                type: 'object',
                properties: {
                    buttonConfig: {
                        type: 'object',
                        description: 'Button config',
                        properties: {
                            label: {
                                type: 'string',
                                description: 'Label of the button'
                            }
                        }
                    },
                    onClickAction: {
                        type: 'object',
                        description: 'Click action config config',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Name of the action to trigger on click on button'
                            },
                            arguments: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    .add('Copy JSON: omits "default" properties in result', () => (
        <Button
            onClick={() => action(getInteractiveProp('onClickAction.name'))(getInteractiveProp('onClickAction.arguments'))}
        >
            {getInteractiveProp('buttonConfig.label')}
        </Button>
    ), {
        interactiveProps: {
            initialProps: {
                buttonConfig: {
                    label: 'Default label'
                },
                onClickAction: {
                    name: 'click',
                    arguments: ['argument#1']
                }
            },
            schema: {
                type: 'object',
                properties: {
                    buttonConfig: {
                        type: 'object',
                        description: 'Button config',
                        default: {
                            label: 'Default label'
                        },
                        properties: {
                            label: {
                                type: 'string',
                                default: 'Default label of button',
                                description: 'Label of the button'
                            }
                        }
                    },
                    onClickAction: {
                        type: 'object',
                        description: 'Click action config config',
                        default: {
                            name: 'click',
                            arguments: ['argument#1']
                        },
                        properties: {
                            name: {
                                type: 'string',
                                default: 'click',
                                description: 'Name of the action to trigger on click on button'
                            },
                            arguments: {
                                type: 'array',
                                default: ['argument#1'],
                                items: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    });
