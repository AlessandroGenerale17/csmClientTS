import { apiUrl } from '../../configs';
import axios from 'axios';
import { selectToken } from './selectors';
import {
    appLoading,
    appDoneLoading,
    showMessageWithTimeout,
    setMessage
} from '../appState/actions';

import { ReduxState } from '../rootReducer';
import { AppDispatch, RootState } from '..';

const loginSuccess = (userWithToken: {
    name: string;
    email: string;
    token: string;
}) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userWithToken
    };
};

const tokenStillValid = (userWithoutToken: {
    email: string;
    name: string;
}) => ({
    type: 'TOKEN_STILL_VALID',
    payload: userWithoutToken
});

export const logOut = () => ({ type: 'LOG_OUT' });

export const signUp = (name: string, email: string, password: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/signup`, {
                name,
                email,
                password
            });

            dispatch(
                loginSuccess({
                    name: response.data.name,
                    email: response.data.email,
                    token: response.data.token
                })
            );
            dispatch(
                showMessageWithTimeout('success', true, 'account created', 2000)
            );
            dispatch(appDoneLoading());
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                dispatch(setMessage('danger', true, error.message));
            }
            dispatch(appDoneLoading());
        }
    };
};

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/login`, {
                email,
                password
            });

            dispatch(loginSuccess(response.data));
            dispatch(
                showMessageWithTimeout('success', false, 'welcome back!', 1500)
            );
            dispatch(appDoneLoading());
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                dispatch(setMessage('danger', true, error.message));
            }
            dispatch(appDoneLoading());
        }
    };
};

export const getUserWithStoredToken = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        // get token from the state
        const rState = getState();
        if (!rState.user) {
            return;
        }
        const token = selectToken(getState().user);

        dispatch(appLoading());
        try {
            // if we do have a token,
            // check wether it is still valid or if it is expired
            const response = await axios.get(`${apiUrl}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // token is still valid
            dispatch(tokenStillValid(response.data));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            // if we get a 4xx or 5xx response,
            // get rid of the token by logging out
            dispatch(logOut());
            dispatch(appDoneLoading());
        }
    };
};
