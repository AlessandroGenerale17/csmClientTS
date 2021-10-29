import { DEFAULT_MESSAGE_TIMEOUT } from '../../configs';
import { AppDispatch } from '..';
import { ReduxState } from '../rootReducer';

import { AppStateActions } from './types';

export const appLoading = () => ({ type: 'APP_LOADING' });
export const appDoneLoading = () => ({ type: 'APP_DONE_LOADING' });
export const clearMessage = () => ({ type: 'CLEAR_MESSAGE' });

export const setMessage = (
    variant: string,
    dismissable: boolean,
    text: string
): AppStateActions => {
    return {
        type: 'SET_MESSAGE',
        payload: {
            variant,
            dismissable,
            text
        }
    };
};

export const showMessageWithTimeout = (
    variant: string,
    dismissable: boolean,
    text: string,
    timeOutMilliSeconds: number
) => {
    return (dispatch: AppDispatch, getState: () => ReduxState) => {
        dispatch(setMessage(variant, dismissable, text));

        const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

        setTimeout(() => dispatch(clearMessage()), timeout);
    };
};
