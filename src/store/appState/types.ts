import { StateMessage } from '../../Types/Message';

export type AppState = {
    loading: boolean;
    saveLoading: boolean;
    alert: { severity: string; message: string } | null;
};

type Loading = {
    type: 'APP_LOADING';
};

type SaveLoading = {
    type: 'SAVE_LOADING';
};

type DoneLoading = {
    type: 'APP_DONE_LOADING';
};

type SaveDoneLoading = {
    type: 'SAVE_DONE_LOADING';
};

type SetAlert = {
    type: 'SET_ALERT';
    payload: { severity: string; message: string };
};

type ClearAlert = {
    type: 'CLEAR_ALERT';
};

export type AppStateActions =
    | Loading
    | DoneLoading
    | SaveLoading
    | SaveDoneLoading
    | SetAlert
    | ClearAlert;
