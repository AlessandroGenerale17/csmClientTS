import { DEFAULT_MESSAGE_TIMEOUT } from '../../configs';
import { AppDispatch, RootState } from '..';

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

export const showAlertWithTimeout =
    (message: string, severity: string) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setAlert(message, severity));
        setTimeout(() => dispatch(clearAlert()), DEFAULT_MESSAGE_TIMEOUT);
    };
