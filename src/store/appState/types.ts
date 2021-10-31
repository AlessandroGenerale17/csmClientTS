import { StateMessage } from '../../Types/Message';

export type AppState = {
    loading: boolean;
    message: StateMessage | null;
};

type Loading = {
    type: 'APP_LOADING';
};

type DoneLoading = {
    type: 'APP_DONE_LOADING';
};

type SetMessage = {
    type: 'SET_MESSAGE';
    payload: StateMessage;
};

type ClearMessage = {
    type: 'CLEAR_MESSAGE';
};

export type AppStateActions = SetMessage | Loading | DoneLoading | ClearMessage;
