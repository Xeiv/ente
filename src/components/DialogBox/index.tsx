import React from 'react';
import constants from 'utils/strings/constants';
import {
    Breakpoint,
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
} from '@mui/material';
import DialogTitleWithCloseButton from './titleWithCloseButton';
import MessageText from './messageText';
import DialogBoxBase from './base';

export interface DialogBoxAttributes {
    title?: string;
    staticBackdrop?: boolean;
    nonClosable?: boolean;
    content?: any;
    close?: {
        text?: string;
        variant?: ButtonProps['color'];
        action?: () => void;
        titleCloseButton?: boolean;
    };
    proceed?: {
        text: string;
        action: () => void;
        variant: ButtonProps['color'];
        disabled?: boolean;
    };
}

export type SetDialogBoxAttributes = React.Dispatch<
    React.SetStateAction<DialogBoxAttributes>
>;
type Props = React.PropsWithChildren<
    Omit<DialogProps, 'open' | 'onClose' | 'maxSize'> & {
        show: boolean;
        onHide: () => void;
        attributes: DialogBoxAttributes;
        size?: Breakpoint;
    }
>;

export default function DialogBox({ attributes, children, ...props }: Props) {
    if (!attributes) {
        return <Dialog open={false} />;
    }

    const handleClose: DialogProps['onClose'] = (_, reason) => {
        if (attributes?.nonClosable) {
            // no-op
        } else if (attributes?.staticBackdrop && reason === 'backdropClick') {
            // no-op
        } else {
            props.onHide();
        }
    };

    return (
        <DialogBoxBase
            open={props.show}
            maxWidth={props.size}
            onClose={handleClose}
            {...props}>
            {attributes.title && (
                <DialogTitleWithCloseButton
                    onClose={
                        !attributes?.nonClosable &&
                        attributes?.close?.titleCloseButton &&
                        handleClose
                    }>
                    {attributes.title}
                </DialogTitleWithCloseButton>
            )}
            {(children || attributes?.content) && (
                <DialogContent>
                    {children || (
                        <MessageText>{attributes.content}</MessageText>
                    )}
                </DialogContent>
            )}
            {(attributes.close || attributes.proceed) && (
                <DialogActions>
                    <>
                        {attributes.close && (
                            <Button
                                color={attributes.close?.variant ?? 'secondary'}
                                onClick={() => {
                                    attributes.close.action &&
                                        attributes.close?.action();
                                    props.onHide();
                                }}>
                                {attributes.close?.text ?? constants.OK}
                            </Button>
                        )}
                        {attributes.proceed && (
                            <Button
                                color={attributes.proceed?.variant ?? 'primary'}
                                onClick={() => {
                                    attributes.proceed.action();
                                    props.onHide();
                                }}
                                disabled={attributes.proceed.disabled}>
                                {attributes.proceed.text}
                            </Button>
                        )}
                    </>
                </DialogActions>
            )}
        </DialogBoxBase>
    );
}
