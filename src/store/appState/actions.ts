import { DEFAULT_MESSAGE_TIMEOUT } from '../../configs';
import { AppDispatch, RootState } from '..';

import { AppStateActions } from './types';

export const appLoading = () => ({ type: 'APP_LOADING' });
export const appDoneLoading = () => ({ type: 'APP_DONE_LOADING' });
export const clearMessage = () => ({ type: 'CLEAR_MESSAGE' });
export const saveLoading = () => ({ type: 'SAVE_LOADING' });
export const saveDoneLoading = () => ({ type: 'SAVE_DONE_LOADING' });
export const clearFormAlert = () => ({ type: 'CLEAR_FORM_ALERT' });

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

export const setFormAlert = (text: string) => ({
    type: 'SET_FORM_ALERT',
    payload: text
});

export const showMessageWithTimeout = (
    variant: string,
    dismissable: boolean,
    text: string,
    timeOutMilliSeconds: number
) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setMessage(variant, dismissable, text));

        const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

        setTimeout(() => dispatch(clearMessage()), timeout);
    };
};

export const showFormAlertWithTimeout =
    (text: string) => (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setFormAlert(text));
        setTimeout(() => dispatch(clearFormAlert()), 1500);
    };
