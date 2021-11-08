import { DEFAULT_MESSAGE_TIMEOUT } from '../../configs';
import { AppDispatch, RootState } from '..';

import { AppStateActions } from './types';

export const appLoading = () => ({ type: 'APP_LOADING' });
export const appDoneLoading = () => ({ type: 'APP_DONE_LOADING' });
export const clearMessage = () => ({ type: 'CLEAR_MESSAGE' });
export const saveLoading = () => ({ type: 'SAVE_LOADING' });
export const saveDoneLoading = () => ({ type: 'SAVE_DONE_LOADING' });
export const clearAlert = () => ({ type: 'CLEAR_ALERT' });

export const setAlert = (message: string, severity: string) => ({
    type: 'SET_ALERT',
    payload: { message, severity }
});

// export const showMessageWithTimeout = (
//     variant: string,
//     dismissable: boolean,
//     text: string,
//     timeOutMilliSeconds: number
// ) => {
//     return (dispatch: AppDispatch, getState: () => RootState) => {
//         dispatch(setMessage(variant, dismissable, text));

//         const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

//         setTimeout(() => dispatch(clearMessage()), timeout);
//     };
// };

export const showAlertWithTimeout =
    (message: string, severity: string) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setAlert(message, severity));
        setTimeout(() => dispatch(clearAlert()), 1500);
    };
