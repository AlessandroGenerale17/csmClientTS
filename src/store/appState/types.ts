import { StateMessage } from '../../Types/Message';

export type AppState = {
    loading: boolean;
    saveLoading: boolean;
    message: StateMessage | null;
    formMessage: string | null;
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

type SetMessage = {
    type: 'SET_MESSAGE';
    payload: StateMessage;
};

type ClearMessage = {
    type: 'CLEAR_MESSAGE';
};

type SetFormAlert = {
    type: 'SET_FORM_ALERT';
    payload: string;
};

type ClearFormAlert = {
    type: 'CLEAR_FORM_ALERT';
};

export type AppStateActions =
    | SetMessage
    | Loading
    | DoneLoading
    | ClearMessage
    | SaveLoading
    | SaveDoneLoading
    | SetFormAlert
    | ClearFormAlert;
