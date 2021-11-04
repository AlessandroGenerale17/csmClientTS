import { AppState, AppStateActions } from './types';

const initialState: AppState = {
    loading: false,
    saveLoading: false,
    message: null,
    formMessage: null
};

const reducer = (state = initialState, action: AppStateActions): AppState => {
    switch (action.type) {
        case 'APP_LOADING':
            return { ...state, loading: true };

        case 'APP_DONE_LOADING':
            return { ...state, loading: false };

        case 'SAVE_LOADING':
            return { ...state, saveLoading: true };

        case 'SAVE_DONE_LOADING':
            return { ...state, saveLoading: false };

        case 'SET_MESSAGE':
            return { ...state, message: action.payload };

        case 'CLEAR_MESSAGE':
            return { ...state, message: null };

        case 'SET_FORM_ALERT':
            return { ...state, formMessage: action.payload };

        case 'CLEAR_FORM_ALERT':
            return { ...state, formMessage: null };

        default:
            return state;
    }
};

export default reducer;
