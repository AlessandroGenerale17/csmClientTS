import { AppState, AppStateActions } from './types';

const initialState: AppState = {
    loading: false,
    saveLoading: false,
    alert: null
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

        case 'SET_ALERT':
            console.log(action);
            return {
                ...state,
                alert: {
                    severity: action.payload.severity,
                    message: action.payload.message
                }
            };

        case 'CLEAR_ALERT':
            return { ...state, alert: null };

        default:
            return state;
    }
};

export default reducer;
